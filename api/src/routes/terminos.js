const { ok, error, created, deleted, badRequest } = require('utils/').responses;
const server = require('express').Router();
const { Terminos } = require('models/');

server.get('/test', (req, res) => res.send(ok()));

server.get('/terms', (req, res) => {
  Terminos.findById(1)
    .then((termino) => {
      if (!termino) return res.sendStatus(404);
      return res.send(termino.dataValues.terms);
    });
});

server.get('/privacy', (req, res) => {
  Terminos.findById(1)
    .then((termino) => {
      if (!termino) return res.sendStatus(404);
      return res.send(termino.dataValues.privacy);
    });
});

server.get('/about', (req, res) => {
  Terminos.findById(1)
    .then((termino) => {
      if (!termino) return res.sendStatus(404);
      return res.send(termino.dataValues.about);
    });
});


server.post('/', (req, res, next) => {
  const { terms, privacy, about } = req.body;
  Terminos.upsert({ id: 1, terms, privacy, about })
    .then(texto => res.status(200).send(ok(texto)))
    .catch(next);
});

module.exports = server;
