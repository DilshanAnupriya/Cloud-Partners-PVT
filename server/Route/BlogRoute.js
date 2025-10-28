const router = require('express').Router();
const {
    createBlog,
    approveBlog,
    rejectBlog,
    publishBlog,
    getPendingBlogs,
    getAllBlogs,
    getPublishedBlogs,
    getBlogById,
    getBlogBySlug,
    getMyBlogs,
    updateBlog,
    deleteBlog,
    getBlogStats
} = require('../Controller/BlogController');
const verifyToken = require('../middleware/auth');

// ==================== PUBLIC ROUTES ====================
// No authentication required
router.get('/blogs/published', getPublishedBlogs);
router.get('/blogs/slug/:slug', getBlogBySlug);
router.get('/blogs/:id/public', getBlogById);

// ==================== USER ROUTES ====================
// Users can create, view their own blogs
router.post('/blogs', verifyToken(['Sales','PM','BA','Developer', 'Admin']), createBlog);
router.get('/my-blogs', verifyToken(['Sales','PM','BA','Developer', 'Admin']), getMyBlogs);
router.put('/blogs/:id', verifyToken(['Sales','PM','BA','Developer', 'Admin']), updateBlog);
router.delete('/blogs/:id', verifyToken(['Sales','PM','BA','Developer', 'Admin']), deleteBlog);

// ==================== ADMIN ROUTES ====================
// Admin approval workflow
router.get('/blogs/pending', verifyToken(['Admin']), getPendingBlogs);
router.put('/blogs/:id/approve', verifyToken(['Admin']), approveBlog);
router.put('/blogs/:id/reject', verifyToken(['Admin']), rejectBlog);
router.put('/blogs/:id/publish', verifyToken(['Admin']), publishBlog);

// Admin can view all blogs
router.get('/blogs', verifyToken(['Admin']), getAllBlogs);
router.get('/blogs/:id', verifyToken(['Admin']), getBlogById);


// ==================== STATISTICS ====================
router.get('/blogs-stats', verifyToken(['Admin']), getBlogStats);

module.exports = router;