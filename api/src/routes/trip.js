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

// add skyspots to an existing trip

server.put('/:id', (req, res, next) => {
  Trip.find({where: { id: req.params.id}})
  .then(trip => {
    if(!trip) return res.sendStatus(404)
    return trip.setSkyspots(req.body.skyspotsArray)
  })
  .then(tripWithSkyspots => res.send(ok(tripWithSkyspots)))
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
  req.skyspot
    .destroy()
    .then(trip => res.status(204).send(deleted(trip)))
    .catch(next);
});

module.exports = server;