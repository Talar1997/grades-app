const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const server = require('./utils/serverRunner');
const app = require('./app');
const db = require('./utils/databaseConnector');
const ExceptionsHandler = require("./utils/exceptionsHandler");

//Connect to database
db.connect()

// Start the server
server.runServer(app);

process.on('unhandledRejection', err => new ExceptionsHandler(err));
process.on('uncaughtException', err => new ExceptionsHandler(err));
