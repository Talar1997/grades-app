const Subject = require('./../models/subject');
const base = require('./baseController');

exports.getAll = base.getAll(Subject);
exports.getOne = base.getOne(Subject);
exports.createOne = base.createOne(Subject);
exports.updateOne = base.updateOne(Subject);
exports.deleteOne = base.deleteOne(Subject);