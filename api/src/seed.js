const session = require('supertest-session');
const app = require('app.js');
const db = require('db.js');
const { User, Trip, Skyspot, Origin, Destination } = require('models/index.js');


const aTrip = {
  name: 'AEP-FTE'
}

const skyspot1 = {
  name: 'Represa Salto Grande',
  data: 'https://aireapp.org/2018/07/19/represa-salto-grande/',
  latitude: -67.6205063,
  longitude: -45.8204256
}

const skyspot2 = {
  name: 'Esteros del Iberá',
  data: 'https://aireapp.org/2018/07/12/esteros-del-ibera/',
  latitude: -61.7483139,
  longitude: -45.8204256
}

const anOrigin = {
  address: 'Buenos Aires'
}

const aDestination = {
  address: 'Calafate'
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
  .then(() => Skyspot.create(skyspot1))
  .then(() => Skyspot.create(skyspot2))
  .then(() => Origin.create(anOrigin))
  .then(() => Destination.create(aDestination))
  .then(()=> Trip.create({
    name: 'Test',
    originId: 1,
    destinationId: 1,
    skyspots: [
    {
      name: 'Represa Salto Grande',
      data: 'https://aireapp.org/2018/07/19/represa-salto-grande/',
      latitude: -67.6205063,
      longitude: -45.8204256
    }, 
    {
      name: '423 Salto Grande',
      data: 'https://aireapp.org/2018/07/19/represa-salto-grande/',
      latitude: -67.6205063,
      longitude: -45.8204256}]
    }, 
    {
      include: Skyspot
    }))

/*const transactionSeed = setUp.then(() => agent.post('/transaction').send(aScan))
  .then(() => agent.post('/transaction/prizePurchase').send(aPurchase))
  .then(() => agent.post('/transaction').send(anEnter))
  .then(() => agent.post('/survey/product/1').send(aSurvey))
  .then(() => agent.post('/transaction/survey').send(aSurveyResponse));
*/

module.exports = setUp;