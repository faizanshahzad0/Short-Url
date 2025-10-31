const mongoose = require('mongoose');
const USER_ROLES = require('../enums/userRole');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: USER_ROLES.NORMAL,
        enum: Object.values(USER_ROLES),
    },
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;