const {
    promisify
} = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const Recaptcha = require('recaptcha-v2').Recaptcha;
const errorHandler = require('../utils/errorHandler');
const successController = require('./responseControllers/successController');


const createToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const validateToken = async req => {
    try {
        let token = req.cookies['authToken'];
        if (!token) return {state: false, message: "Token doesn't exists"};

        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const user = await User.findById(decode.id);
        if (!user) return {state: false, message: "Owner of this token doesn't exists"};

        const validTo = decode.exp;
        if (validTo < (Date.now() / 1000)) return {state: false, message: "Token is no longer valid (expired)"};

        return {state: true, message: "Token is valid", data: decode}
    } catch (err) {
        return {state: false, message: `Unexpected error: ${err}`};
    }
};

exports.checkTokenValidation = async (req, res, next) => {
    let {state, message, data} = await validateToken(req);
    if (!state) return next(new AppError(401, 'fail', message), req, res, next);
    else {
        const extraResponseData = {valid: true, message: "Token is still valid", expires: data.exp};
        successController(res, 200, null, false, extraResponseData);
    }
};

exports.logout = async (req, res, next) => {
    res.clearCookie('authToken', {path: '/'});
    const message = "authToken removed successfully";
    successController(res, 200, null, false, {message});
};

exports.login = async (req, res, next) => {
    try {
        const {
            email,
            password,
            recaptchaToken,
        } = req.body;

        if (process.env.REQUIRE_RECAPTCHA === 'true') {
            if (!recaptchaToken) {
                return next(new AppError(401, 'fail', 'Recaptcha token is required to proceed further'), req, res, next);
            } else {
                let data = {
                    remoteip: req.connection.remoteAddress,
                    response: recaptchaToken,
                    secret: process.env.RECAPTCHA_PRIVATE
                };
                let recaptcha = new Recaptcha(process.env.RECAPTCHA_PUBLIC, process.env.RECAPTCHA_PRIVATE, data, false);
                recaptcha.verify(function (success, error_code) {
                    if (!success) {
                        return next(new AppError(401, 'fail', `Recaptcha validation failed ${error_code}`), req, res, next);
                    }
                });
            }
        }

        if (!email || !password) {
            return next(new AppError(401, 'fail', 'Please provide email or password'), req, res, next);
        }

        const user = await User.findOne({email}).select('+password');

        //If user doesn't exists, decrypting random password to increase response time
        if (!user) {
            let user = new User;
            await user.correctPassword(password, '$2a$12$ePZSHmwvU3kwxn//g1Ptxe3QMxiuluwMKDSG81Na7oai40XNq3OAm');
            return next(new AppError(401, 'fail', 'Name or Password is wrong'), req, res, next);
        }


        if (!await user.correctPassword(password, user.password)) {
            return next(new AppError(401, 'fail', 'Name or Password is wrong'), req, res, next);
        }

        const token = createToken(user.id);

        user.password = undefined;

        const expiresIn = process.env.JWT_EXPIRES_IN.substr(0, process.env.JWT_EXPIRES_IN.length - 1);
        const expiresTimestamp = expiresIn * 60 * 60 * 1000;
        const validTo = Date.now() + expiresTimestamp;

        res.header('Access-Control-Allow-Credentials', true);
        res.cookie('authToken', token, {maxAge: expiresTimestamp, Path: "/", httpOnly: true});
        successController(res, 200, {user}, false, {expires: validTo});

    } catch (error) {
        errorHandler(error, req, res, next);
    }
};

exports.signUp = async (req, res, next) => {
    try {
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            role: req.body.role,
        });

        let createdUser = {
            _id: user._id,
            role: user.role,
            active: user.active,
            name: user.name,
            email: user.email
        };
        successController(res, 201, {user: createdUser});
    } catch (error) {
        errorHandler(error, req, res, next);
    }

};

exports.protect = async (req, res, next) => {
    let {state, message, data} = await validateToken(req);
    if (!state) return next(new AppError(401, 'fail', message), req, res, next);
    else {
        req.user = await User.findById(data.id);
        next();
    }
};

// Authorization check if the user have rights to do this action
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError(403, 'fail', 'You are not allowed to do this action'), req, res, next);
        }
        next();
    };
};