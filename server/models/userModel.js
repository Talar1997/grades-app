const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill your name'],
        unique: false,
    },
    email: {
        type: String,
        required: [true, 'Please fill your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, ' Please provide a valid email'],
        select: true

    },
    password: {
        type: String,
        required: [true, 'Please fill password'],
        minLength: 8,
        maxLength: 128,
        validate: {
            validator: (v) => {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,128}$/.test(v);
            },
            message: `Password should contain 1 upper case, 1 lower case, 1 number or special character and at least 8 characters length (max 128)`
        },
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'logged',
        select: true,
    },
    active: {
        type: Boolean,
        default: true,
        select: true
    },

    added: {
        type: Date,
        select: true,
    }
});

// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
userSchema.pre('save', async function (next) {
    // check the password if it is modified
    if (!this.isModified('password')) {
        return next();
    }

    // Hashing the password
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

// This is Instance Method that is gonna be available on all documents in a certain collection
userSchema.methods.correctPassword = async function (typedPassword, originalPassword) {
    return await bcrypt.compare(typedPassword, originalPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;