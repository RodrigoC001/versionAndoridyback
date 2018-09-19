const session = require('supertest-session');
const app = require('app.js');
const db = require('db.js');
const { User, Trip, Skyspot, Origin, Destination } = require('models/index.js');
const skyspotsArrayFinal = require('./utils/geoJsonToSeed.js');

const aTrip = {
  name: 'AEP-FTE'
}

const anOrigin = {
  address: 'Buenos Aires'
}

const aDestination = {
  address: 'Buenos Aires'
}

const agent = session(app);

const credentials = {
  email: 'valid@email.com',
  password: 'validPassword',
};


const init = db.sync({ force: true })
  .then(() => User.create(credentials))
  .then((newUser) => {
    return agent.post('/auth/login').send(credentials);
  });

const setUp = init.then(() => Trip.create(aTrip))
  .then(()=> skyspotsArrayFinal.map(skyspot => Skyspot.create(skyspot)))
  .then(() => Origin.create(anOrigin))
  .then(() => Destination.create(aDestination))
  .then(()=> Trip.create({
    name: 'Test solo con ids',
    originId: 1,
    destinationId: 1}))
  .then(trip => trip.setSkyspots([1,2,3,4]))

module.exports = setUp;