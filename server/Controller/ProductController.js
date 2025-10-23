const Product = require('../Model/ProductModel');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const {
            name,
            vendor,
            category,
            description,
            shortDescription,
            features,
            logo,
            images,
            website,
            documentation,
            supportEmail,
            tags,
            integrations,
            specifications,
            isFeatured,
            isActive
        } = req.body;

        if (!name || !vendor || !category || !description) {
            return res.status(400).json({
                error: 'Name, vendor, category, and description are required'
            });
        }

        const productObj = new Product({
            name,
            vendor,
            category,
            description,
            shortDescription,
            features: features || [],
            logo,
            images: images || [],
            website,
            documentation,
            supportEmail,
            tags: tags || [],
            integrations: integrations || [],
            specifications,
            isFeatured: isFeatured || false,
            isActive: isActive !== undefined ? isActive : true,
            createdBy: req.user.userId
        });

        await productObj.save();

        res.status(201).json({
            message: 'Product created successfully',
            product: productObj
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Get all products with filters and pagination
const getAllProducts = async (req, res) => {
    try {
        const {
            searchText = '',
            vendor = '',
            category = '',
            isFeatured = '',
            isActive = '',
            page = 1,
            size = 10,
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        const filter = {};

        // Search
        if (searchText) {
            filter.$or = [
                { name: { $regex: searchText, $options: 'i' } },
                { description: { $regex: searchText, $options: 'i' } },
                { tags: { $regex: searchText, $options: 'i' } }
            ];
        }

        if (vendor) {
            filter.vendor = vendor;
        }

        if (category) {
            filter.category = category;
        }

        if (isFeatured !== '') {
            filter.isFeatured = isFeatured === 'true';
        }

        if (isActive !== '') {
            filter.isActive = isActive === 'true';
        }



        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObj = { [sortBy]: sortOrder };

        const products = await Product.find(filter)
            .populate('createdBy', 'username email')
            .sort(sortObj)
            .skip((page - 1) * size)
            .limit(parseInt(size));

        const count = await Product.countDocuments(filter);

        res.status(200).json({
            message: 'Products retrieved successfully',
            products: products,
            count: count,
            totalPages: Math.ceil(count / size),
            currentPage: parseInt(page)
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Get featured products
const getFeaturedProducts = async (req, res) => {
    try {
        const { limit = 6 } = req.query;

        const products = await Product.find({ isFeatured: true, isActive: true })
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Featured products retrieved successfully',
            products: products
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Get products by vendor
const getProductsByVendor = async (req, res) => {
    try {
        const { vendor } = req.params;
        const { page = 1, size = 10 } = req.query;

        const products = await Product.find({ vendor: vendor, isActive: true })
            .skip((page - 1) * size)
            .limit(parseInt(size))
            .sort({ createdAt: -1 });

        const count = await Product.countDocuments({ vendor: vendor, isActive: true });

        res.status(200).json({
            message: `${vendor} products retrieved successfully`,
            products: products,
            count: count,
            totalPages: Math.ceil(count / size)
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { page = 1, size = 10 } = req.query;

        const products = await Product.find({ category: category, isActive: true })
            .skip((page - 1) * size)
            .limit(parseInt(size))
            .sort({ createdAt: -1 });

        const count = await Product.countDocuments({ category: category, isActive: true });

        res.status(200).json({
            message: `${category} products retrieved successfully`,
            products: products,
            count: count,
            totalPages: Math.ceil(count / size)
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('createdBy', 'username email');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product retrieved successfully',
            product: product
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Get product by slug
const getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
            .populate('createdBy', 'username email');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product retrieved successfully',
            product: product
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if user is admin
        if (!req.user.role.includes('Admin')) {
            return res.status(403).json({ error: 'Only admins can update products' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('createdBy', 'username email');

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if user is admin
        if (!req.user.role.includes('Admin')) {
            return res.status(403).json({ error: 'Only admins can delete products' });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Product deleted successfully',
            product: product
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Get product statistics
const getProductStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const activeProducts = await Product.countDocuments({ isActive: true });
        const featuredProducts = await Product.countDocuments({ isFeatured: true });

        const productsByVendor = await Product.aggregate([
            { $group: { _id: '$vendor', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const productsByCategory = await Product.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.status(200).json({
            message: 'Product statistics retrieved successfully',
            stats: {
                totalProducts,
                activeProducts,
                featuredProducts,
                productsByVendor,
                productsByCategory
            }
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Compare products
const compareProducts = async (req, res) => {
    try {
        const { productIds } = req.body; // Array of product IDs

        if (!productIds || !Array.isArray(productIds) || productIds.length < 2) {
            return res.status(400).json({ error: 'At least 2 product IDs are required for comparison' });
        }

        if (productIds.length > 5) {
            return res.status(400).json({ error: 'Maximum 5 products can be compared at once' });
        }

        const products = await Product.find({
            _id: { $in: productIds },
            isActive: true
        }).select('name vendor category pricingPlans features website logo');

        if (products.length < 2) {
            return res.status(404).json({ error: 'Not enough products found for comparison' });
        }

        res.status(200).json({
            message: 'Products comparison retrieved successfully',
            products: products
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
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
};