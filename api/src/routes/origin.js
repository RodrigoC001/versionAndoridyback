const { ok, error, created, deleted, badRequest } = require('utils/').responses;
const { expose } = require('utils/').scopes.module;
const server = require('express').Router();
const { Origin, Trip } = require('models/');

const { validateCookie } = require('controllers/auth');

server.param('id', (req, res, next, id) => {
  Origin.find({
    where: { id },
    include: [
    {
      model: Trip, as: 'routes_origin'
    }]})
    .then(origin => {
      req.origin = origin;
      next();
    })
    .catch(next);
});

server.get('/test', (req, res) => res.send(ok()));

server.get('/:id', (req, res) => {
  if (!req.origin) return res.sendStatus(404);
  return res.send(ok(req.origin));
});

server.get('/', (req, res, next) => {
  Origin.findAll()
    .then(origins => {
      res.send(ok(origins));
    })
    .catch(next);
});

server.post('/', validateCookie, (req, res, next) => {
  Origin.create(req.body)
    .then(resource => res.status(201).send(created(resource)))
    .catch(next);
});

server.put('/:id', validateCookie, (req, res, next) => {
  if (!req.origin) return res.sendStatus(404);
  req.origin
    .update(req.body)
    .then(origin => res.send(ok(origin)))
    .catch(next)
})

server.delete('/:id', validateCookie, (req, res, next) => {
  req.origin
    .destroy()
    .then(origin => res.send(ok(req.origin)))
    .catch(next);
});

module.exports = server;