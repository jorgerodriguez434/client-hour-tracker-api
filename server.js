const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const { CLIENT_ORIGIN } = require("./config");

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

app.get('/test', (req, res) => {

		res.json({
			hi : "this is an API GET response!"
		});

});

app.post('/api/books', (req, res) => {

		res.json({hi: "this is an API POST response 124!"});

});




app.listen(8080, console.log("Hi from the backend!"));
module.exports = {app};

/*
if not receving post response, make sure that you are connected to mongoose
Also, if no address is found, make sure that you are exporting the app
*/