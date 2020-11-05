const AppError = require('../utils/appError');

module.exports = (error, req, res, next) => {
    if (error.name === 'ValidationError') return next(new AppError(422, 'fail', 'Validation failed!'), req, res, next);
    if (error.name === 'CastError') return next(new AppError(404, 'fail', 'No document found because id format is incorrect'), req, res, next);
    else return next(new AppError(500, 'fail', 'Unhandler error: ' + error.name), req, res, next);
};