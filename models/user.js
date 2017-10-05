const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const s3 = require('../lib/s3');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: 'Email address is already taken!'},
  password: { type: String, required: true },
  age: { type: Number },
  image: { type: String, default: 'https://spacelist.ca/assets/ui/placeholder-user.b5ae7217a7.jpg' },
  bio: { type: String }, //add max characters
  riding: { type: String}, //decide the type later?
  bikeType: {type: String}
});

userSchema
  .virtual('rides', { //name of virtual
    ref: 'Ride', //model name
    localField: '_id', // use the _id field from this schema to match createdBy field from the Post schema
    foreignField: 'createdBy'
  });

userSchema
  .virtual('ridesJoined', { //name of virtual
    ref: 'Ride', //model name
    localField: '_id', // use the _id field from this schema to match createdBy field from the Post schema
    foreignField: 'members'
  });


userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  if(this.isModified('image') && this._image && !this._image.match(/^http/)) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

userSchema.virtual('imageSRC')
  .get(function getImageSRC(){
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return`https://s3-eu-west-1.amazonaws.com/mardzy-wdi/${this.image}`;
  });

userSchema.pre('remove', function removeImage(next) {
  if(this.image && !this.image.match(/^http/)){
    return s3.deleteObject({ Key: this.image }, next);
  }
  this.model('Ride').remove({ createdBy: this._id }, next);
  next();
});

module.exports = mongoose.model('User', userSchema);
