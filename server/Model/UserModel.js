const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: [String],
        enum:['Sales','BA','PM','Developer','Admin'],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);