module.exports = {
    credentials: true,
    origin: process.env.ORIGIN,
    secure: true,
    methods: "GET,PATCH,POST,DELETE",
    preflightContinue: false,
    maxAge: 604800
};