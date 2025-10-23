const Blog = require('../Model/BlogModel');

// Create a new blog
const createBlog = async (req, res) => {
    try {
        const { title, content, excerpt, category, tags, featuredImage, status } = req.body;

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
            status: status || 'Draft',
            author: req.user._id// From JWT middleware
        });

        await blogObj.save();
        await blogObj.populate('author', 'username email');

        res.status(201).json({
            message: 'Blog created successfully',
            blog: blogObj
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
            author = '',
            tags = '',
            page = 1,
            size = 10,
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        // Build filter object
        const filter = {};

        // Search in title, content, and tags
        if (searchText) {
            filter.$or = [
                { title: { $regex: searchText, $options: 'i' } },
                { content: { $regex: searchText, $options: 'i' } },
                { tags: { $regex: searchText, $options: 'i' } }
            ];
        }

        if (category) {
            filter.category = category;
        }

        if (status) {
            filter.status = status;
        }

        if (author) {
            filter.author = author;
        }

        if (tags) {
            filter.tags = { $in: tags.split(',') };
        }

        // Sort object
        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObj = { [sortBy]: sortOrder };

        const blogs = await Blog.find(filter)
            .populate('author', 'username email')
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

        const filter = { status: 'Published', isPublished: true };

        if (searchText) {
            filter.$or = [
                { title: { $regex: searchText, $options: 'i' } },
                { content: { $regex: searchText, $options: 'i' } },
                { tags: { $regex: searchText, $options: 'i' } }
            ];
        }

        if (category) {
            filter.category = category;
        }

        if (tags) {
            filter.tags = { $in: tags.split(',') };
        }

        const blogs = await Blog.find(filter)
            .populate('author', 'username email')
            .select('-comments') // Exclude comments for list view
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
        const blog = await Blog.findOne({ slug: req.params.slug })
            .populate('author', 'username email role')
            .populate('likes', 'username')
            .populate('comments.user', 'username email');

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Increment views
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

// Get blogs by current user
const getMyBlogs = async (req, res) => {
    try {
        const { page = 1, size = 10 } = req.query;

        const blogs = await Blog.find({ author: req.user.userId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * size)
            .limit(parseInt(size));

        const count = await Blog.countDocuments({ author: req.user.userId });

        res.status(200).json({
            message: 'Your blogs retrieved successfully',
            blogs: blogs,
            count: count
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Update blog
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if user is author or admin
        if (blog.author.toString() !== req.user.userId && !req.user.role.includes('Admin')) {
            return res.status(403).json({ error: 'You are not authorized to update this blog' });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('author', 'username email');

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

        // Check if user is author or admin
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

// Like/Unlike blog
const toggleLike = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const userId = req.user.userId;
        const likeIndex = blog.likes.indexOf(userId);

        if (likeIndex === -1) {
            // Like the blog
            blog.likes.push(userId);
            await blog.save();
            res.status(200).json({
                message: 'Blog liked successfully',
                liked: true,
                likesCount: blog.likes.length
            });
        } else {
            // Unlike the blog
            blog.likes.splice(likeIndex, 1);
            await blog.save();
            res.status(200).json({
                message: 'Blog unliked successfully',
                liked: false,
                likesCount: blog.likes.length
            });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Add comment to blog
const addComment = async (req, res) => {
    try {
        const { comment } = req.body;

        if (!comment) {
            return res.status(400).json({ error: 'Comment is required' });
        }

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        blog.comments.push({
            user: req.user.userId,
            comment: comment
        });

        await blog.save();
        await blog.populate('comments.user', 'username email');

        res.status(201).json({
            message: 'Comment added successfully',
            comments: blog.comments
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Delete comment
const deleteComment = async (req, res) => {
    try {
        const { blogId, commentId } = req.params;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const comment = blog.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user is comment author or admin
        if (comment.user.toString() !== req.user.userId && !req.user.role.includes('Admin')) {
            return res.status(403).json({ error: 'You are not authorized to delete this comment' });
        }

        blog.comments.pull(commentId);
        await blog.save();

        res.status(200).json({
            message: 'Comment deleted successfully'
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
};