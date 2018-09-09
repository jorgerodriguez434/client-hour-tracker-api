const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({

  firstName: String,
  lastName: String,
  hours: Number,
  created: {type: Date, default: Date.now}

});



const Client = mongoose.model('Client', ClientSchema);

module.exports = {Client};
