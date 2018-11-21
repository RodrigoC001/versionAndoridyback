const { ok, error, created, deleted, badRequest } = require('utils/').responses;
const server = require('express').Router();
const { Terminos } = require('models/');

const { validateCookie } = require('controllers/auth');

server.get('/test', (req, res) => res.send(ok()));

server.get('/termsAndPrivacy', (req, res) => {
  console.log('Terminos', Terminos)
  Terminos.findById(1)
    .then((termino) => {
      if (!termino) return res.sendStatus(404);
      return res.send(termino.dataValues.termsAndPrivacy);
    });
});

server.get('/faq', (req, res) => {
  Terminos.findById(1)
    .then((termino) => {
      if (!termino) return res.sendStatus(404);
      return res.send(termino.dataValues.faq);
    });
});

server.post('/', validateCookie, (req, res, next) => {
  const { termsAndPrivacy, faq } = req.body;
  Terminos.upsert({ id: 1, termsAndPrivacy, faq })
    .then(texto => res.status(200).send(ok(texto)))
    .catch(next);
});

module.exports = server;
