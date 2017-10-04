const mongoose = require('mongoose');

const coordinateSchema = new mongoose.Schema({
  lat: Number,
  lng: Number
});

const rideMemberSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.ObjectId, ref: 'User'},
  pending: Boolean,
  message: String
});

const commentSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  text: String,
  likesArray: [ { type: mongoose.Schema.ObjectId, ref: 'User'} ]
});

const rideSchema = new mongoose.Schema({
  name: String,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  startPoint: coordinateSchema,
  endPoint: coordinateSchema,
  wayPoints: [ coordinateSchema ],
  memberArray: [ rideMemberSchema ],
  comments: [ commentSchema ],
  ridePace: String,
  rideIsCommute: Boolean,
  notes: String
});

module.exports = mongoose.model('Ride', rideSchema);
