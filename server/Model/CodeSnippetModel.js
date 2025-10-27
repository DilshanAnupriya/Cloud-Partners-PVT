const mongoose = require('mongoose');

const codeSnippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Snippet title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    code: {
        type: String,
        required: [true, 'Code is required']
    },
    language: {
        type: String,
        required: true,
        enum: [
            'javascript','deluge', 'typescript', 'python', 'java', 'csharp',
            'cpp', 'c', 'go', 'rust', 'php', 'ruby', 'swift',
            'kotlin', 'dart', 'sql', 'html', 'css', 'scss',
            'json', 'xml', 'yaml', 'markdown', 'bash', 'shell',
            'powershell', 'other'
        ],
        default: 'javascript'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
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
    isFavorite: {
        type: Boolean,
        default: false
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    notes: {
        type: String,
        maxlength: [2000, 'Notes cannot exceed 2000 characters']
    }
}, {
    timestamps: true
});

// Indexes for better performance
 codeSnippetSchema.index({ project: 1, createdAt: -1 });
 codeSnippetSchema.index({ owner: 1, createdAt: -1 });
// codeSnippetSchema.index({ title: 'text', description: 'text', code: 'text' });

module.exports = mongoose.model('CodeSnippet', codeSnippetSchema);