const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const globalErrHandler = require('./controllers/responseControllers/errorController');
const mongoSanitize = require('express-mongo-sanitize');
const AppError = require('./utils/appError');
const cookieParser = require('cookie-parser');
const app = express();
const corsConfig = require('./config/cors_config');


// Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Security
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());
app.use(express.json({limit: '15kb'}));

// Routes config
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1/users', userRoutes);

app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'Undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;