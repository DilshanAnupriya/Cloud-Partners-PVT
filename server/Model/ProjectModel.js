const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true,
        maxlength: [100, 'Project name cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    isPublic: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: '#3B82F6' // Default blue color
    },
    icon: {
        type: String,
        default: '📁'
    },
    snippetCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for better query performance
projectSchema.index({ owner: 1, createdAt: -1 });
projectSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Project', projectSchema);
