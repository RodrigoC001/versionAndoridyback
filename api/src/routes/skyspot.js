const { ok, error, created, deleted, badRequest } = require('utils/').responses;
const { expose } = require('utils/').scopes.module;
const server = require('express').Router();
const { Skyspot, Trip } = require('models/');

server.param('id', (req, res, next, id) => {
  Skyspot.find({
    where: { id },
    include: [
    {
      model: Trip
    }]})
    .then(skyspot => {
      req.skyspot = skyspot;
      next();
    })
    .catch(next);
});

server.get('/test', (req, res) => res.send(ok()));

server.get('/:id', (req, res) => {
  if (!req.skyspot) return res.sendStatus(404);
  return res.send(ok(req.skyspot));
});

server.get('/', (req, res, next) => {
  Skyspot.findAll()
    .then(skyspots => {
      res.send(ok(skyspots));
    })
    .catch(next);
});

server.post('/', (req, res, next) => {
  Skyspot.create(req.body)
    .then(resource => res.status(201).send(created(resource)))
    .catch(next);
});

server.delete('/:id', (req, res, next) => {
  req.skyspot
    .destroy()
    .then(skyspot => res.status(204).send(deleted(skyspot)))
    .catch(next);
});

module.exports = server;