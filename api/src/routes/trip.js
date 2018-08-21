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

server.get('/:id', (req, res) => {
  if (!req.trip) return res.sendStatus(404);
  return res.send(ok(req.trip));
});

server.get('/', (req, res, next) => {
  Trip.findAll()
    .then(trips => {
      res.send(ok(trips));
    })
    .catch(next);
});

server.post('/', (req, res, next) => {
  Trip.create(req.body)
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