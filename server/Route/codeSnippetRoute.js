const express = require('express');
const router = express.Router();
const {
    createSnippet,
    getProjectSnippets,
    getMySnippets,
    getSnippetById,
    updateSnippet,
    deleteSnippet,
    toggleFavorite,
    duplicateSnippet
} = require('../Controller/CodeSnippetController');
const verifyToken = require('../middleware/auth');
// All routes require authentication
router.use(verifyToken());

// Snippet routes
router.post('/snippets', verifyToken(['User', 'Admin']), createSnippet);
router.get('/snippets', verifyToken(['User', 'Admin']), getMySnippets);
router.get('/snippets/:id', verifyToken(['User', 'Admin']), getSnippetById);
router.put('/snippets/:id', verifyToken(['User', 'Admin']), updateSnippet);
router.delete('/snippets/:id', verifyToken(['User', 'Admin']), deleteSnippet);
router.post('/snippets/:id/favorite', verifyToken(['User', 'Admin']), toggleFavorite);
router.post('/snippets/:id/duplicate', verifyToken(['User', 'Admin']), duplicateSnippet);

// Get snippets for a specific project
router.get('/projects/:projectId/snippets', verifyToken(['User', 'Admin']), getProjectSnippets);

module.exports = router;
