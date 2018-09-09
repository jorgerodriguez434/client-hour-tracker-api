exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000/';
exports.DATABASE_URL = process.env.DATABASE_URL ||
global.DATABASE_URL ||
                 'mongodb://localhost/client-hour-tracker';
exports.PORT = process.env.PORT || 8080;