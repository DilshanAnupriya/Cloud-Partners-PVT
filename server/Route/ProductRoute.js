const router = require('express').Router();
const {
    createProduct,
    getAllProducts,
    getFeaturedProducts,
    getProductsByVendor,
    getProductsByCategory,
    getProductById,
    getProductBySlug,
    updateProduct,
    deleteProduct,
    getProductStats,
    compareProducts
} = require('../Controller/ProductController');
const verifyToken = require('../middleware/auth');

// Public routes (no authentication required)
router.get('/products', getAllProducts);
router.get('/products/featured', getFeaturedProducts);
router.get('/products/vendor/:vendor', getProductsByVendor);
router.get('/products/category/:category', getProductsByCategory);
router.get('/products/slug/:slug', getProductBySlug);
router.get('/products/:id', getProductById);
router.post('/products/compare', compareProducts);

// Protected routes (admin only)
router.post('/products', verifyToken(['Admin']), createProduct);
router.put('/products/:id', verifyToken(['Admin']), updateProduct);
router.delete('/products/:id', verifyToken(['Admin']), deleteProduct);


// Statistics (admin only)
router.get('/products-stats', verifyToken(['Admin']), getProductStats);

module.exports = router;