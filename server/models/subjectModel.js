const mongoose = require('mongoose');
const Schema = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill subject name'],
        unique: false,
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        select: true
    },

    active: {
        type: Boolean,
        default: true,
        select: true
    },

    date: {
        type: Date,
        select: true,
        required: [true, 'Please provide frequent date'],
    },

    added: {
        type: Date,
        default: new Date(),
        select: true,
    },

});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;