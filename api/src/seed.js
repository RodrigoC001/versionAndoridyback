const session = require('supertest-session');
const app = require('app.js');
const db = require('db.js');
const { User, Trip, Skyspot, Origin, Destination, Terminos } = require('models/index.js');
const skyspotsArrayFinal = require('./utils/geoJsonToSeed.js');

const aTrip = {
  name: 'AEP-FTE'
}

const seedTerminos = {
  termsAndPrivacy: '<p>Seed <strong>termsAndPrivacy </strong></p>',
  faq: '<p>Seed <strong>FAQ </strong></p>'
}

const originOne = {
  address: 'Buenos Aires'
}

const destinationOne = {
  address: 'Buenos Aires'
}

const originTwo = {
  address: 'El Calafate, Argentina'
}

const destinationTwo = {
  address: 'El Calafate, Argentina'
}

const originThree = {
  address: 'Paraná, Entre Rios'
}

const destinationThree = {
  address: 'Paraná, Entre Rios'
}

const originFour = {
  address: 'San Miguel de Tucuman, Tucuman'
}

const destinationFour = {
  address: 'San Miguel de Tucuman, Tucuman'
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
  .then(() => Origin.create(originOne))
  .then(() => Destination.create(destinationOne))
  .then(() => Origin.create(originTwo))
  .then(() => Destination.create(destinationTwo))
  .then(() => Origin.create(originThree))
  .then(() => Destination.create(destinationThree))
  .then(() => Origin.create(originFour))
  .then(() => Destination.create(destinationFour))   
  .then(()=> Trip.create({
    name: 'Test solo con ids',
    originId: 1,
    destinationId: 2}))
  .then(trip => trip.setSkyspots([1,2,3,4]))
  .then(()=> Trip.create({
    name: 'Test trip 2',
    originId: 1,
    destinationId: 4}))
  .then(trip => trip.setSkyspots([1,2,3,4]))
  .then(()=> Terminos.create(seedTerminos))

module.exports = setUp;