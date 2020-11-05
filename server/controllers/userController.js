const User = require('../models/userModel');
const base = require('./baseController');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/errorHandler');
const validator = require('validator');
const successController = require('./responseControllers/successController');

exports.getAllUsers = base.getAll(User);
exports.getUser = base.getOne(User);

//TODO refactor redundant code with userModel.
const updateUser = Model => async (req, res, next) => {
    try {
        if (req.body.password) {
            if (validator.matches(req.body.password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,128}$/)) {
                req.body.password = await bcrypt.hash(req.body.password, 12);
            } else {
                return next(new AppError(422, 'fail', 'Validation failed!'), req, res, next);
            }
        }

        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        successController(res, 200, {doc});
    } catch (error) {
        errorHandler(error, req, res, next);
    }
};

exports.updateUser = updateUser(User);
exports.deleteUser = base.deleteOne(User);