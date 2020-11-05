const fs = require('fs');
const privateKey = fs.readFileSync('certs/server.key', 'utf8');
const certificate = fs.readFileSync('certs/server.crt', 'utf8');
const helpers = require('./consoleHelpers');
const https = require('https');

const port = process.env.PORT;
const connection = process.env.CONNECTION_TYPE;
const options = {
    key: privateKey,
    cert: certificate
};

exports.runServer = (app) => {
    helpers.welcomeMessage();
    if (connection === 'https') https.createServer(options, app);
    else https.createServer(app);
    app.listen(port, () => helpers.log(`REST API is running on ${connection} port ${port}`));
}