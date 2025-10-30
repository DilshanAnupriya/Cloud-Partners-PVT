const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: Date,
    completedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// FIX: Updated progress update schema to match frontend
const progressUpdateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// FIX: Updated roadmap schema to match frontend
const roadmapSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    dueDate: Date,
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    completedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    client: {
        type: String,
        required: true
    },

    // Team Members
    salesperson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    businessAnalyst: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    developers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    // Project Stage
    stage: {
        type: String,
        enum: [
            'sales',
            'requirement-gathering',
            'handover-to-pm',
            'assigned-to-developer',
            'finished'
        ],
        default: 'sales'
    },

    // Stage History for tracking
    stageHistory: [{
        stage: String,
        changedAt: {
            type: Date,
            default: Date.now
        },
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],

    // Progress tracking
    progressUpdates: [progressUpdateSchema],

    // Tasks
    tasks: [taskSchema],

    // Documents
    documents: [{
        name: String,
        url: String,
        fileName: String,
        fileSize: Number,
        mimeType: String,
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],

    // FIX: Updated roadmap using schema
    roadmap: [roadmapSchema],

    // Dates
    startDate: Date,
    estimatedEndDate: Date,
    actualEndDate: Date,

    // Status
    isActive: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
PmSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Pm', PmSchema);