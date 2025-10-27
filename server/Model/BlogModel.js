const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        maxlength: 200
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        enum: ['Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 'Business', 'Education', 'Other'],
        default: 'Other'
    },
    tags: [{
        type: String,
        trim: true
    }],
    featuredImage: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['Draft', 'Pending', 'Approved', 'Rejected', 'Published', 'Archived'],
        default: 'Draft'
    },
    approvalStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: null
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    approvedAt: {
        type: Date,
        default: null
    },
    rejectionReason: {
        type: String,
        default: null
    },
    views: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Create slug from title before saving
blogSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    }

    // Set publishedAt when status changes to Published
    if (this.isModified('status') && this.status === 'Published' && !this.publishedAt) {
        this.publishedAt = new Date();
        this.isPublished = true;
    }

    next();
});

// Index for better search performance
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });
blogSchema.index({ status: 1, approvalStatus: 1 });

module.exports = mongoose.model('Blog', blogSchema);