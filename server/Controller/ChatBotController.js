const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model names to try in order of preference
const MODEL_FALLBACKS = [
    'gemini-2.0-flash-exp',           // Latest experimental Flash
    'gemini-exp-1206',                // Experimental model
    'gemini-2.0-flash-thinking-exp',  // Thinking model
    'gemini-2.0-flash',               // Stable Gemini 2.0 Flash
    'gemini-1.5-flash',               // Fallback to 1.5 Flash
    'gemini-1.5-flash-latest',        // Latest 1.5 Flash
    'gemini-pro'                      // Final fallback
];

// Cache for working model
let workingModel = null;
let modelInstance = null;

// Function to test and get a working model
const getWorkingModel = async () => {
    // Return cached model if available
    if (workingModel && modelInstance) {
        return { name: workingModel, instance: modelInstance };
    }

    console.log('Finding working Gemini model...');

    for (const modelName of MODEL_FALLBACKS) {
        try {
            console.log(`Testing model: ${modelName}`);
            
            const testModel = genAI.getGenerativeModel({ 
                model: modelName,
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 1024,
                    responseMimeType: "text/plain",
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE",
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE",
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE",
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE",
                    },
                ],
            });

            // Test with a simple prompt
            const result = await testModel.generateContent("Hi");
            const response = await result.response;
            await response.text(); // This will throw if the model doesn't work

            // If we get here, the model works!
            console.log(`✓ Successfully using model: ${modelName}`);
            workingModel = modelName;
            modelInstance = testModel;
            return { name: modelName, instance: testModel };

        } catch (error) {
            console.log(`✗ Model ${modelName} failed: ${error.message}`);
            continue;
        }
    }

    throw new Error('No working Gemini model found. Please check your API key and internet connection.');
};

// Rate limiting storage
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 15;

const checkRateLimit = (identifier) => {
    const now = Date.now();
    const userRequests = rateLimitStore.get(identifier) || [];
    const validRequests = userRequests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
    
    if (validRequests.length >= MAX_REQUESTS_PER_WINDOW) {
        return false;
    }
    
    validRequests.push(now);
    rateLimitStore.set(identifier, validRequests);
    return true;
};

// Chat with AI - FIXED VERSION with auto model selection
const chatWithAI = async (req, res) => {
    console.log('\n=== NEW REQUEST ===');
    console.log('Time:', new Date().toISOString());
    console.log('API Key exists:', !!process.env.GEMINI_API_KEY);
    
    try {
        const { message, conversationHistory = [] } = req.body;
        const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
        
        console.log('Request body:', { message, historyLength: conversationHistory.length });
        console.log('Client IP:', clientIP);

        // Validate message
        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        // Check rate limit
        if (!checkRateLimit(clientIP)) {
            return res.status(429).json({
                success: false,
                message: "Rate limit exceeded. Please wait a moment before sending another message.",
                retryAfter: 60
            });
        }

        // Validate message length
        if (message.length > 2000) {
            return res.status(400).json({
                success: false,
                message: "Message too long. Please keep it under 2000 characters."
            });
        }

        // Get working model
        const { name: modelName, instance: model } = await getWorkingModel();

        // Build conversation context
        let prompt = message;
        if (conversationHistory.length > 0) {
            const recentHistory = conversationHistory.slice(-5);
            const context = recentHistory
                .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
                .join('\n');
            prompt = `Previous conversation:\n${context}\n\nUser: ${message}`;
        }

        // Generate response from Gemini
        console.log(`Sending request to Gemini API using model: ${modelName}...`);
        const result = await model.generateContent(prompt);
        
        // Wait for the response
        const response = await result.response;
        console.log('Received response from Gemini API');
        
        // Get the text
        let aiResponse;
        try {
            aiResponse = response.text();
        } catch (textError) {
            console.error('Error extracting text:', textError);
            
            // Check if response was blocked by safety filters
            if (response.promptFeedback && response.promptFeedback.blockReason) {
                return res.status(400).json({
                    success: false,
                    message: `Response blocked: ${response.promptFeedback.blockReason}. Please rephrase your question.`
                });
            }
            
            return res.status(400).json({
                success: false,
                message: "Unable to generate response. The content may have been filtered."
            });
        }

        // Validate response content
        if (!aiResponse || aiResponse.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Received empty response. Please try rephrasing your question."
            });
        }

        // Send successful response
        res.status(200).json({
            success: true,
            message: "Response generated successfully",
            data: {
                userMessage: message,
                aiResponse: aiResponse,
                timestamp: new Date().toISOString(),
                model: modelName
            }
        });

    } catch (error) {
        console.error('Error in chatWithAI:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        // Handle specific Gemini API errors
        if (error.message && error.message.includes('API key')) {
            return res.status(401).json({
                success: false,
                message: "Invalid API key. Please check your GEMINI_API_KEY environment variable."
            });
        }
        
        if (error.message && error.message.includes('quota')) {
            return res.status(429).json({
                success: false,
                message: "API quota exceeded. Please try again later."
            });
        }
        
        if (error.message && (error.message.includes('safety') || error.message.includes('blocked'))) {
            return res.status(400).json({
                success: false,
                message: "Content blocked by safety filters. Please rephrase your message."
            });
        }

        if (error.message && error.message.includes('ECONNREFUSED')) {
            return res.status(503).json({
                success: false,
                message: "Unable to connect to Gemini API. Please check your internet connection."
            });
        }

        if (error.message && error.message.includes('No working Gemini model found')) {
            return res.status(503).json({
                success: false,
                message: "Unable to find a compatible Gemini model. Please check your API key."
            });
        }

        // Generic error response
        res.status(500).json({
            success: false,
            message: "Failed to generate AI response. Please try again.",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Start a new chat session
const startChatSession = async (req, res) => {
    try {
        const clientIP = req.ip || req.connection.remoteAddress || 'unknown';

        if (!checkRateLimit(clientIP)) {
            return res.status(429).json({
                success: false,
                message: "Rate limit exceeded. Please wait before starting a new session.",
                retryAfter: 60
            });
        }

        // Try to get working model to verify API is ready
        const { name: modelName } = await getWorkingModel();

        res.status(200).json({
            success: true,
            message: "Chat session started successfully",
            data: {
                sessionId: Date.now().toString(),
                timestamp: new Date().toISOString(),
                model: modelName,
                limits: {
                    maxMessageLength: 2000,
                    maxHistoryLength: 5,
                    requestsPerMinute: MAX_REQUESTS_PER_WINDOW
                }
            }
        });

    } catch (error) {
        console.error('Error starting chat session:', error);
        res.status(500).json({
            success: false,
            message: "Failed to start chat session",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Chat with streaming response
const chatWithStreaming = async (req, res) => {
    try {
        const { message } = req.body;
        const clientIP = req.ip || req.connection.remoteAddress || 'unknown';

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        if (!checkRateLimit(clientIP)) {
            return res.status(429).json({
                success: false,
                message: "Rate limit exceeded. Please wait before sending another message.",
                retryAfter: 60
            });
        }

        if (message.length > 2000) {
            return res.status(400).json({
                success: false,
                message: "Message too long. Please keep it under 2000 characters."
            });
        }

        // Get working model
        const { instance: model } = await getWorkingModel();

        // Set headers for streaming
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');
        res.setHeader('Access-Control-Allow-Origin', '*');

        const result = await model.generateContentStream(message);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
                res.write(chunkText);
            }
        }

        res.end();

    } catch (error) {
        console.error('Error in streaming chat:', error);
        if (!res.headersSent) {
            if (error.message && error.message.includes('quota')) {
                res.status(429).json({
                    success: false,
                    message: "API quota exceeded. Please try again later."
                });
            } else if (error.message && error.message.includes('safety')) {
                res.status(400).json({
                    success: false,
                    message: "Content blocked by safety filters. Please rephrase your message."
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Failed to generate streaming response",
                    error: process.env.NODE_ENV === 'development' ? error.message : undefined
                });
            }
        }
    }
};

module.exports = {
    chatWithAI,
    startChatSession,
    chatWithStreaming
};