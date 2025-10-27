const Blog = require('../Model/BlogModel');

// Create a new blog - automatically set to Pending status
const createBlog = async (req, res) => {
    try {
        const { title, content, excerpt, category, tags, featuredImage } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const blogObj = new Blog({
            title,
            content,
            excerpt,
            category,
            tags: tags || [],
            featuredImage,
            status: 'Pending', // Automatically set to Pending for approval
            approvalStatus: 'Pending',
            author: req.user._id // From JWT middleware
        });

        await blogObj.save();
        await blogObj.populate('author', 'username email');

        res.status(201).json({
            message: 'Blog submitted for approval',
            blog: blogObj
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Admin: Approve blog
const approveBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.approvalStatus === 'Approved') {
            return res.status(400).json({ message: 'Blog is already approved' });
        }

        blog.approvalStatus = 'Approved';
        blog.status = 'Approved';
        blog.approvedBy = req.user.userId;
        blog.approvedAt = new Date();
        blog.rejectionReason = null;

        await blog.save();
        await blog.populate('author', 'username email');
        await blog.populate('approvedBy', 'username email');

        res.status(200).json({
            message: 'Blog approved successfully',
            blog: blog
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Admin: Reject blog
const rejectBlog = async (req, res) => {
    try {
        const { reason } = req.body;

        if (!reason) {
            return res.status(400).json({ error: 'Rejection reason is required' });
        }

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        blog.approvalStatus = 'Rejected';
        blog.status = 'Rejected';
        blog.rejectionReason = reason;
        blog.approvedBy = req.user.userId;
        blog.approvedAt = new Date();

        await blog.save();
        await blog.populate('author', 'username email');

        res.status(200).json({
            message: 'Blog rejected',
            blog: blog
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Admin: Publish approved blog
const publishBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.approvalStatus !== 'Approved') {
            return res.status(400).json({
                message: 'Blog must be approved before publishing',
                currentStatus: blog.approvalStatus
            });
        }

        blog.status = 'Published';
        blog.isPublished = true;
        blog.publishedAt = new Date();

        await blog.save();
        await blog.populate('author', 'username email');

        res.status(200).json({
            message: 'Blog published successfully',
            blog: blog
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Admin: Get all pending blogs
const getPendingBlogs = async (req, res) => {
    try {
        const { page = 1, size = 10 } = req.query;

        const blogs = await Blog.find({
            status: 'Pending',
            approvalStatus: 'Pending'
        })
            .populate('author', 'username email')
            .sort({ createdAt: -1 })
            .skip((page - 1) * size)
            .limit(parseInt(size));

        const count = await Blog.countDocuments({
            status: 'Pending',
            approvalStatus: 'Pending'
        });

        res.status(200).json({
            message: 'Pending blogs retrieved successfully',
            blogs: blogs,
            count: count,
            totalPages: Math.ceil(count / size),
            currentPage: parseInt(page)
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Get all blogs with filters, search, and pagination
const getAllBlogs = async (req, res) => {
    try {
        const {
            searchText = '',
            category = '',
            status = '',
            approvalStatus = '',
            author = '',
            tags = '',
            page = 1,
            size = 10,
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        const filter = {};

        if (searchText) {
            filter.$or = [
                { title: { $regex: searchText, $options: 'i' } },
                { content: { $regex: searchText, $options: 'i' } },
                { tags: { $regex: searchText, $options: 'i' } }
            ];
        }

        if (category) filter.category = category;
        if (status) filter.status = status;
        if (approvalStatus) filter.approvalStatus = approvalStatus;
        if (author) filter.author = author;
        if (tags) filter.tags = { $in: tags.split(',') };

        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObj = { [sortBy]: sortOrder };

        const blogs = await Blog.find(filter)
            .populate('author', 'username email')
            .populate('approvedBy', 'username email')
            .populate('likes', 'username')
            .populate('comments.user', 'username')
            .sort(sortObj)
            .skip((page - 1) * size)
            .limit(parseInt(size));

        const count = await Blog.countDocuments(filter);

        res.status(200).json({
            message: 'Blogs retrieved successfully',
            blogs: blogs,
            count: count,
            totalPages: Math.ceil(count / size),
            currentPage: parseInt(page)
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Get published blogs only (for public view)
const getPublishedBlogs = async (req, res) => {
    try {
        const {
            searchText = '',
            category = '',
            tags = '',
            page = 1,
            size = 10
        } = req.query;

        const filter = {
            status: 'Published',
            isPublished: true,
            approvalStatus: 'Approved'
        };

        if (searchText) {
            filter.$or = [
                { title: { $regex: searchText, $options: 'i' } },
                { content: { $regex: searchText, $options: 'i' } },
                { tags: { $regex: searchText, $options: 'i' } }
            ];
        }

        if (category) filter.category = category;
        if (tags) filter.tags = { $in: tags.split(',') };

        const blogs = await Blog.find(filter)
            .populate('author', 'username email')
            .select('-comments')
            .sort({ publishedAt: -1 })
            .skip((page - 1) * size)
            .limit(parseInt(size));

        const count = await Blog.countDocuments(filter);

        res.status(200).json({
            message: 'Published blogs retrieved successfully',
            blogs: blogs,
            count: count,
            totalPages: Math.ceil(count / size),
            currentPage: parseInt(page)
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Get blog by ID
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'username email role')
            .populate('approvedBy', 'username email')
            .populate('likes', 'username')
            .populate('comments.user', 'username email');

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({
            message: 'Blog retrieved successfully',
            blog: blog
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Get blog by slug (for SEO-friendly URLs)
const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({
            slug: req.params.slug,
            status: 'Published',
            isPublished: true
        })
            .populate('author', 'username email role')
            .populate('likes', 'username')
            .populate('comments.user', 'username email');

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        blog.views += 1;
        await blog.save();

        res.status(200).json({
            message: 'Blog retrieved successfully',
            blog: blog
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const getMyBlogs = async (req, res) => {
    try {
        console.log('🔍 FULL req.user:', {
            _id: req.user?._id,
            username: req.user?.username,
            role: req.user?.role
        });

        const { page = 1, size = 10, status = '' } = req.query;

        // Use req.user._id instead of req.user.userId
        const userId = req.user._id;
        console.log('User ID:', userId);

        const filter = { author: userId };
        if (status) filter.status = status;

        console.log('Filter:', filter);

        const blogs = await Blog.find(filter)
            .populate('author', 'username email')
            .populate('approvedBy', 'username email')
            .sort({ createdAt: -1 })
            .skip((page - 1) * size)
            .limit(parseInt(size));

        console.log('Found blogs:', blogs.length);

        const count = await Blog.countDocuments(filter);

        res.status(200).json({
            message: 'Your blogs retrieved successfully',
            blogs: blogs,
            count: count,
            totalPages: Math.ceil(count / size),
            currentPage: parseInt(page)
        });
    } catch (e) {
        console.error('Error in getMyBlogs:', e);
        res.status(500).json({ error: e.message });
    }
};
// Update blog - Users can only update Draft or Rejected blogs
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check authorization
        if (blog.author.toString() !== req.user.userId && !req.user.role.includes('Admin')) {
            return res.status(403).json({ error: 'You are not authorized to update this blog' });
        }

        // Users can only edit Draft or Rejected blogs
        if (!req.user.role.includes('Admin') && !['Draft', 'Rejected'].includes(blog.status)) {
            return res.status(400).json({
                error: 'You can only edit blogs in Draft or Rejected status',
                currentStatus: blog.status
            });
        }

        // If updating a rejected blog, reset to Pending
        if (blog.status === 'Rejected') {
            req.body.status = 'Pending';
            req.body.approvalStatus = 'Pending';
            req.body.rejectionReason = null;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
            .populate('author', 'username email')
            .populate('approvedBy', 'username email');

        res.status(200).json({
            message: 'Blog updated successfully',
            blog: updatedBlog
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Delete blog
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.author.toString() !== req.user.userId && !req.user.role.includes('Admin')) {
            return res.status(403).json({ error: 'You are not authorized to delete this blog' });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Blog deleted successfully',
            blog: blog
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


// Get blog statistics
const getBlogStats = async (req, res) => {
    try {
        const totalBlogs = await Blog.countDocuments();
        const publishedBlogs = await Blog.countDocuments({ status: 'Published' });
        const pendingBlogs = await Blog.countDocuments({ status: 'Pending' });
        const approvedBlogs = await Blog.countDocuments({ status: 'Approved' });
        const rejectedBlogs = await Blog.countDocuments({ status: 'Rejected' });
        const draftBlogs = await Blog.countDocuments({ status: 'Draft' });
        const archivedBlogs = await Blog.countDocuments({ status: 'Archived' });

        const totalViews = await Blog.aggregate([
            { $group: { _id: null, total: { $sum: '$views' } } }
        ]);

        const totalLikes = await Blog.aggregate([
            { $group: { _id: null, total: { $sum: { $size: '$likes' } } } }
        ]);

        const blogsByCategory = await Blog.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.status(200).json({
            message: 'Blog statistics retrieved successfully',
            stats: {
                totalBlogs,
                publishedBlogs,
                pendingBlogs,
                approvedBlogs,
                rejectedBlogs,
                draftBlogs,
                archivedBlogs,
                totalViews: totalViews[0]?.total || 0,
                totalLikes: totalLikes[0]?.total || 0,
                blogsByCategory
            }
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
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
};