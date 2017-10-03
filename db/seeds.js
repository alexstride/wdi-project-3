const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, { useMongoClient: true });

const User = require('../models/user');
const Ride = require('../models/ride');

User.collection.drop();
Ride.collection.drop();


User
  .create([{
    name: 'Brad',
    email: 'inopea@pea.com',
    age: 16,
    image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/3/005/04b/07c/1606dd7.jpg',
    bio: 'FYI: I like a joke', //add max characters
    riding: 'sometimes', //decide the type later?
    bikeType: 'none',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created.`);
    return Ride
      .create([
        {
          createdBy: users[0],
          startPoint: {
            lat: 51.517240,
            lng: -0.097280
          },
          endPoint: {
            lat: 51.517300,
            lng: -0.057300
          },
          wayPoints: [
            {
              lat: 51.517240,
              lng: -0.097280
            },
            {
              lat: 51.517240,
              lng: -0.097280
            },
            {
              lat: 51.517240,
              lng: -0.097280
            }
          ],
          memberArray: [],
          comments: [
            {
              text: 'Hello hello'
            },
            {
              text: 'Hello hello'
            },
            {
              text: 'Hello hello'
            }
          ]
        },
        {
          createdBy: users[0],
          startPoint: {
            lat: 51.4,
            lng: -0.1
          },
          endPoint: {
            lat: 51.7,
            lng: -0.1
          },
          wayPoints: [
            {
              lat: 51.7,
              lng: -0.1
            },
            {
              lat: 51.7,
              lng: -0.1
            },
            {
              lat: 51.7,
              lng: -0.1
            }
          ],
          memberArray: [],
          comments: [
            {
              text: 'Oi Oi'
            },
            {
              text: 'Comment blabla'
            },
            {
              text: 'jsvwnc'
            }
          ]
        }
      ]);
  })
  .then((rides) => {
    console.log(`${rides.length} rides created!`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
