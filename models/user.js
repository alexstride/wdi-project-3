const mongoose = require('mongoose');
//add bcrypt

const userSchema = new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  age: { type: Number, required: true },
  image: { type: String },
  bio: { type: String }, //add max characters
  riding: { type: String}, //decide the type later?
  bikeType: {type: String}


});

module.exports = mongoose.model('User', userSchema);
