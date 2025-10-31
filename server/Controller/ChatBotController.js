const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Chat with AI
const chatWithAI = async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        // Build conversation context
        let prompt = message;
        if (conversationHistory.length > 0) {
            const context = conversationHistory
                .map(msg => `${msg.role}: ${msg.content}`)
                .join('\n');
            prompt = `Previous conversation:\n${context}\n\nUser: ${message}`;
        }

        // Generate response from Gemini
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiResponse = response.text();

        res.status(200).json({
            success: true,
            message: "Response generated successfully",
            data: {
                userMessage: message,
                aiResponse: aiResponse,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Error in chatWithAI:', error);
        res.status(500).json({
            success: false,
            message: "Failed to generate AI response",
            error: error.message
        });
    }
};

// Start a new chat session
const startChatSession = async (req, res) => {
    try {
        const chat = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
            },
        });

        res.status(200).json({
            success: true,
            message: "Chat session started successfully",
            data: {
                sessionId: Date.now().toString(),
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Error starting chat session:', error);
        res.status(500).json({
            success: false,
            message: "Failed to start chat session",
            error: error.message
        });
    }
};

// Chat with streaming response
const chatWithStreaming = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        // Set headers for streaming
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');

        const result = await model.generateContentStream(message);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            res.write(chunkText);
        }

        res.end();

    } catch (error) {
        console.error('Error in streaming chat:', error);
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: "Failed to generate streaming response",
                error: error.message
            });
        }
    }
};

module.exports = {
    chatWithAI,
    startChatSession,
    chatWithStreaming
};