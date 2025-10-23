const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
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
    vendor: {
        type: String,
        required: true,
        enum: ['Google','Zoho','Salesforce','Other'],
        default: 'Other'
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Productivity Suite',
            'Marketing',
            'Project Management',
            'Cloud Storage',
            'Communication',
            'Analytics',
            'HR Management',
            'Finance',
            'Sales & CRM',
            'Google',
            'Other'
        ],
        default: 'Other'
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        maxlength: 200
    },
    features: [{
        title: String,
        description: String,
        icon: String
    }],
    logo: {
        type: String, // URL to logo image
        default: null
    },
    images: [{
        type: String // URLs to product screenshots
    }],
    website: {
        type: String,
        trim: true
    },
    documentation: {
        type: String,
        trim: true
    },
    supportEmail: {
        type: String,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    integrations: [{
        name: String,
        logo: String
    }],
    specifications: {
        type: Map,
        of: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Create slug from name before saving
productSchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    }
    next();
});

// Index for search
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);