exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "https://client-hour-tracker.herokuapp.com";
exports.DATABASE_URL = process.env.DATABASE_URL ||
global.DATABASE_URL ||
                 'mongodb://localhost/client-hour-tracker';
exports.PORT = process.env.PORT || 8080;

//https://client-hour-tracker.herokuapp.com