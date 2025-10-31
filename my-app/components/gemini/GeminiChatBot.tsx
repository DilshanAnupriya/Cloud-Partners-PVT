import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Loader2, Trash2, X, Brain, Zap, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function GeminiChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory: messages
        })
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage: Message = {
          role: 'assistant',
          content: data.data.aiResponse,
          timestamp: data.data.timestamp
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group"
          >
            <div className="relative">
              <Brain className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
            </div>
          </button>
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            AI Assistant
          </div>
        </div>
      )}

      {/* Smart Assistant Panel */}
      <div className={`fixed left-0 top-0 h-full z-50 transition-transform duration-500 ease-in-out ${
        isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
      }`}>
        <div className={`bg-white h-full shadow-2xl transition-all duration-300 ${
          isMinimized ? 'w-16' : 'w-96'
        } flex flex-col`}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-4 flex items-center justify-between">
            {!isMinimized && (
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Assistant</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Powered by Gemini 1.5 Flash
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <button
                onClick={toggleMinimize}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
              
              {!isMinimized && messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                  title="Clear chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Quick Actions */}
              <div className="p-4 bg-gray-50 border-b">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setInputMessage("Help me understand this project")}
                    className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-indigo-50 transition-colors text-sm"
                  >
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    <span>Project Help</span>
                  </button>
                  <button
                    onClick={() => setInputMessage("Explain this code to me")}
                    className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-purple-50 transition-colors text-sm"
                  >
                    <Brain className="w-4 h-4 text-purple-600" />
                    <span>Code Review</span>
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <div className="relative mb-6">
                      <Brain className="w-20 h-20 opacity-30" />
                      <Sparkles className="w-6 h-6 absolute -top-2 -right-2 text-indigo-400 animate-bounce" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">AI Assistant Ready</h3>
                    <p className="text-center text-sm">Ask me anything about your project, code, or get help with development tasks.</p>
                    <div className="mt-4 text-xs text-gray-400">
                      <p>• Code explanations</p>
                      <p>• Project guidance</p>
                      <p>• Technical questions</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 ${
                          msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                              : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                          }`}
                        >
                          {msg.role === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Brain className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div
                          className={`flex-1 px-4 py-3 rounded-2xl max-w-[280px] ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-md'
                              : 'bg-white text-gray-800 rounded-tl-md shadow-md border border-gray-100'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                            {msg.content}
                          </p>
                          <p className={`text-xs mt-2 ${
                            msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                          }`}>
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 px-4 py-3 rounded-2xl bg-white rounded-tl-md shadow-md border border-gray-100 max-w-[280px]">
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                            <span className="text-sm text-gray-600">Thinking...</span>
                            <div className="flex gap-1">
                              <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse"></div>
                              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                              <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-200"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      rows={1}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm"
                      disabled={isLoading}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex-shrink-0 group"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-400 text-center">
                  Press Enter to send • Shift+Enter for new line
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}