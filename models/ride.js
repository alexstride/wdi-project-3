const mongoose = require('mongoose');

const coordinateSchema = new mongoose.Schema({
  lat: Number,
  lng: Number
});

const commentSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  text: String
});

const rideSchema = new mongoose.Schema({
  name: String,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  startPoint: coordinateSchema,
  endPoint: coordinateSchema,
  wayPoints: [ coordinateSchema ],
  members: [ { type: mongoose.Schema.ObjectId, ref: 'User' } ],
  comments: [ commentSchema ],
  ridePace: String,
  rideIsCommute: Boolean,
  notes: String
});

// const memberSchema = new mongoose.Schema({
//   createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
// });

module.exports = mongoose.model('Ride', rideSchema);
