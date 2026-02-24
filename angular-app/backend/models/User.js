const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    year: {
        type: String,
        default: '' // Allow empty for old users, but field must exist
    },
    department: {
        type: String,
        default: '' // Allow empty for old users, but field must exist
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
