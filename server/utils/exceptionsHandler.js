const helpers = require('./consoleHelpers');

class ExceptionsHandler {
    constructor(err) {
        helpers.log(`UNHANDLED REJECTION! Shutting down...`, `ERROR`);
        helpers.log(err.name + ' ' + err.message + ': ' + err.stackTrace, `ERROR`);
        process.exit(1);
    }
}

module.exports = ExceptionsHandler;