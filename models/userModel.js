// In models/userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['VIEWER', 'FILMMAKER', 'MODERATOR', 'SUPER_ADMIN'],
        default: 'VIEWER'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false // This will prevent the password from being sent back in queries
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// We will add password hashing logic here later before a user is saved.

const User = mongoose.model('User', userSchema);

module.exports = User;
