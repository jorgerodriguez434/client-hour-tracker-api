const express = require("express");
const { Client } = require("./models");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = express.Router();

router.get("/", (req, res) => {
    console.log("Making a GET request");
    Client.find()
      .then(clients => res.status(200).json(clients))
      .catch(err => console.log(err));
  });
  
  router.post("/", jsonParser, (req, res) => {
    const requiredFields = ["firstName", "lastName"];
  
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    }
  
    console.log("Making a POST request");
    //console.log(req.body);
    Client.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      hours: 0
    })
      .then(client => {
        console.log(client);
        res.status(201).json({
          client
        });
      })
      .catch(err => console.log(err));
  });

  router.delete("/:id", (req, res) => {
    console.log("Making a DELETE request");
    Client.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ message: `Client has been deleted` });
        res.status(200).end();
      })
      .catch(err => console.log(err));
  });
  
  router.put("/:id", jsonParser, (req, res) => {
  console.log("Making a PUT request");
  const id = req.params.id;
  Client.findByIdAndUpdate(
    id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hours: req.body.hours,
      }
    },
    { upsert: true, new: true }
  )
    .then(client => {
      //console.log(dish);
      res.json({
        client
      });
    })
    .catch(err => console.log(err));
});
  module.exports = router;