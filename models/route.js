const mongoose = require('mongoose');

const coordinateSchema = new mongoose.Schema({
  lat: Number,
  lng: Number
});

const routeMemberSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.ObjectId, ref: 'User'},
  pending: Boolean,
  message: String
});

const commentSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  text: String,
  likesArray: [ { type: mongoose.Schema.ObjectId, ref: 'User'} ]
});

const routeSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  startPoint: coordinateSchema,
  endPoint: coordinateSchema,
  wayPoints: [ coordinateSchema ],
  memberArray: [ routeMemberSchema ],
  comments: [ commentSchema ]
});

module.exports = mongoose.model('Route', routeSchema);
