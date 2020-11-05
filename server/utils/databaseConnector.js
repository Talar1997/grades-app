const mongoose = require('mongoose');
const database = process.env.DATABASE;
const helpers = require('./consoleHelpers');
const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

// Connect the database
exports.connect = () => {
    mongoose.connect(database, config)
        .then(() => helpers.log(`Database connected successfully`));
}