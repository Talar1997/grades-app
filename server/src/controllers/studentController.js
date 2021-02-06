const Student = require('./../models/student');
const base = require('./baseController');

exports.getAll = base.getAll(Student);
exports.getOne = base.getOne(Student);
exports.createOne = base.createOne(Student);
exports.updateOne = base.updateOne(Student);
exports.deleteOne = base.deleteOne(Student);