const router = require('express').Router();
const {
    createBlog,
    getAllBlogs,
    getPublishedBlogs,
    getBlogById,
    getBlogBySlug,
    getMyBlogs,
    updateBlog,
    deleteBlog,
    toggleLike,
    addComment,
    deleteComment,
    getBlogStats
} = require('../Controller/BlogController');
const verifyToken = require('../middleware/auth');

// Public routes (no authentication required)
router.get('/blogs/published', getPublishedBlogs);
router.get('/blogs/slug/:slug', getBlogBySlug);
router.get('/blogs/:id/public', getBlogById);
// Protected routes (authentication required)
router.post('/blogs', verifyToken(['User','Admin']),createBlog);
router.get('/blogs',  verifyToken(['User','Admin']),getAllBlogs);
router.get('/blogs/my-blogs',  verifyToken(['User','Admin']),getMyBlogs);
router.get('/blogs/:id',  verifyToken(['User','Admin']),getBlogById);
router.put('/blogs/:id',  verifyToken(['User','Admin']),updateBlog);
router.delete('/blogs/:id',  verifyToken(['User','Admin']),deleteBlog);

// Like/Unlike
router.post('/blogs/:id/like',toggleLike);

// Comments
router.post('/blogs/:id/comments',addComment);
router.delete('/blogs/:blogId/comments/:commentId',verifyToken(['Admin']) , deleteComment);

// Statistics (admin only - add admin middleware if needed)
router.get('/blogs-stats',verifyToken(['Admin']), getBlogStats);

module.exports = router;