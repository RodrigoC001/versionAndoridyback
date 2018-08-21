const { ok, error, created, deleted, badRequest } = require('utils/').responses;
const { expose } = require('utils/').scopes.module;
const server = require('express').Router();
const { Destination } = require('models/');

server.param('id', (req, res, next, id) => {
  Destination.find({
    where: { id }})
    .then(destination => {
      req.destination = destination;
      next();
    })
    .catch(next);
});

server.get('/test', (req, res) => res.send(ok()));

server.get('/:id', (req, res) => {
  if (!req.destination) return res.sendStatus(404);
  return res.send(ok(req.destination));
});

server.get('/', (req, res, next) => {
  Destination.findAll()
    .then(destinations => {
      res.send(ok(destinations));
    })
    .catch(next);
});

server.post('/', (req, res, next) => {
  Destination.create(req.body)
    .then(resource => res.status(201).send(created(resource)))
    .catch(next);
});

server.delete('/:id', (req, res, next) => {
  req.destination
    .destroy()
    .then(destination => res.status(204).send(deleted(destination)))
    .catch(next);
});

module.exports = server;