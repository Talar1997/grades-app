const mongoose = require('mongoose');
const Schema = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill student name'],
        unique: false,
    },

    subject:{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },

    grades: [{
        category: {
            type: String,
            required: [true, 'Please fill category name']
        },
        grade: Number,
        severity: Number,
        added: {
            type: Date,
            default: new Date()
        }
    }],

    absences: [{
        date: {
            type: Date,
            default: new Date()
        }
    }]
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
