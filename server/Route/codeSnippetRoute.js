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
router.post('/snippets', verifyToken(['Developer','Admin']), createSnippet);
router.get('/snippets', verifyToken(['Developer', 'Admin']), getMySnippets);
router.get('/snippets/:id', verifyToken(['Developer', 'Admin']), getSnippetById);
router.put('/snippets/:id', verifyToken(['Developer', 'Admin']), updateSnippet);
router.delete('/snippets/:id', verifyToken(['Developer', 'Admin']), deleteSnippet);
router.post('/snippets/:id/favorite', verifyToken(['Developer', 'Admin']), toggleFavorite);
router.post('/snippets/:id/duplicate', verifyToken(['Developer', 'Admin']), duplicateSnippet);

// Get snippets for a specific project
router.get('/projects/:projectId/snippets', verifyToken(['Developer', 'Admin']), getProjectSnippets);

module.exports = router;
