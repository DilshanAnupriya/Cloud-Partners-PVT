const express = require('express');
const router = express.Router();
const { chatWithAI, startChatSession, chatWithStreaming } = require('../Controller/ChatBotController');

// Route to chat with AI
router.post('/chat', chatWithAI);

// Route to start a new chat session
router.post('/start-session', startChatSession);

// Route for streaming chat
router.post('/chat-stream', chatWithStreaming);

module.exports = router;