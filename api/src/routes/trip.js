const { ok, error, created, deleted, badRequest } = require('utils/').responses;
const { expose } = require('utils/').scopes.module;
const server = require('express').Router();
const { Trip, Skyspot, Origin, Destination } = require('models/');

server.param('id', (req, res, next, id) => {
  Trip.find({
    where: { id }, 
    include: [
    {
      model: Skyspot
    },
    {
      model: Origin
    },
    {
      model: Destination
    }
    ]
  })
    .then(trip => {
      req.trip = trip;
      next();
    })
    .catch(next);
});



server.get('/test', (req, res) => res.send(ok()));

// get trips with origin... DUH
server.get('/gettripswithorigin/:originId', (req, res, next) => {
  Trip.findAll({ where: { originId: req.params.originId }, include: [{model: Destination}] })
  .then(trips => {
    res.send(ok(trips));
  })
  .catch(next)
})

// get only the skyspots of certain trip
server.get('/:id/skyspots', (req, res, next) => {
  Trip.find({where: { id: req.params.id}})
  .then(trip => {
    if(!trip) return res.sendStatus(404)
    return trip.getSkyspots()
  })
  .then(tripSkyspots => res.send(ok(tripSkyspots)))
  .catch(next);
});


// first I update with name, originId and destinationId, then set the skyspots
server.put('/:id', (req, res, next) => {
  if (!req.trip) return res.sendStatus(404);
  req.trip
    .update({name: req.body.name, originId: req.body.originId, destinationId: req.body.destinationId})
    .then(trip => trip.setSkyspots(req.body.skyspotsArray))
    .then(()=> {
      return Trip.find({
        where: { id: req.params.id }, 
        include: [
        {
          model: Skyspot
        },
        {
          model: Origin
        },
        {
          model: Destination
        }
        ]
      })
    })
    .then(trip => res.send(ok(trip)))
    .catch(next);
});

// get a Trip with its origin, destination and skyspots array
server.get('/:id', (req, res) => {
  if (!req.trip) return res.sendStatus(404);
  return res.send(ok(req.trip));
});
 
// get all trips with their origin and destination
server.get('/', (req, res, next) => {
  Trip.findAll({include: [{model: Origin}, {model: Destination}, {model: Skyspot }]})
    .then(trips => {
      res.send(ok(trips));
    })
    .catch(next);
});

server.post('/', (req, res, next) => {
  Trip.create({name: req.body.name, originId: req.body.originId, destinationId: req.body.destinationId})
    .then(trip => {
      trip.setSkyspots(req.body.skyspotsArray)
      return trip
    })
    .then(resource => res.status(201).send(created(resource)))
    .catch(next);
});

server.delete('/:id', (req, res, next) => {
  req.trip
    .destroy()
    .then(trip => res.send(ok(req.trip)))
    .catch(next);
});

module.exports = server;