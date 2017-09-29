const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const User = require('../models/user');

User.collection.drop();

User
  .create[{
    name: 'Brad',
    email: 'inopea@pea.com',
    age: 16,
    image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/3/005/04b/07c/1606dd7.jpg',
    bio: 'FYI: I like a joke', //add max characters
    riding: 'sometimes', //decide the type later?
    bikeType: 'none'

  }];

mongoose.connect(dbURI, { useMongoClient: true })
  .then(users => console.log(`${users.length} users created.`))
  .catch(err => console.log(err))
  .finaly(() => mongoose.connection.close());
