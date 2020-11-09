// @author https://github.com/MoathShreim/Nodejs-rest-api-project-structure-Express/blob/master/controllers/

const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const errorHandler = require('../utils/errorHandler');
const successController = require('./responseControllers/successController');

exports.deleteOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        successController(res, 204, null);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
};

exports.updateOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!doc) return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        successController(res, 200, {doc});
    } catch (error) {
        errorHandler(error, req, res, next);
    }
};

exports.createOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.create(req.body);
        successController(res, 201, {doc});
    } catch (error) {
        errorHandler(error, req, res, next);
    }
};

exports.getOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findById(req.params.id).populate(["student", "subject"]);
        if (!doc) return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);

        successController(res, 200, doc);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
};

exports.getAll = Model => async (req, res, next) => {
    try {
        let newQuery = Object.assign({}, req.query);
        if (newQuery.limit) delete newQuery.limit;
        if (newQuery.page) delete newQuery.page;
        if (newQuery.sort) delete newQuery.sort;

        const features = new APIFeatures(Model.find(newQuery).populate(["student", "subject"]), req.query)
            .sort()
            .paginate();

        const doc = await features.query;

        successController(res, 200, doc, true);

    } catch (error) {
        errorHandler(error, req, res, next);
    }

};