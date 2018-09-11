const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const router = require("./router");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const { CLIENT_ORIGIN, DATABASE_URL, PORT } = require("./config");

/**
 * nexrt steps:
 * create a model, use that model to post a client to the mongo database
 * using the config file
 */

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(morgan("common"));
app.use('/api/clients', router);
app.use(express.static('public'));

app.use("*", (req, res) => {
  return res.status(404).json({ message: "route not found", code: 404 });
});

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      { useNewUrlParser: true },
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port} --Sept 2018`);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };

/*
if not receving post response, make sure that you are connected to mongoose
Also, if no address is found, make sure that you are exporting the app
*/
