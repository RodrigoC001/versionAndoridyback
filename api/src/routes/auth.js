const { ok, error, badRequest } = require('utils/').responses;
const { expose } = require('utils/').scopes.user;
const User = require('models/User');
const auth = require('controllers/auth');
const server = require('express').Router();

server.get('/test', (req, res) => {
  res.send('OK');
});

server.post('/activate/:token', (req, res, next) => {
  User.activateUser(req.body.email, req.params.token, req.body.password)
    .then((activatedUser) => {
      if (!activatedUser) return next(badRequest());
      return res.send(ok(expose(activatedUser)));
    });
});

server.post('/changepassword', (req, res, next) => {
  User.changePassword(req.body.email, req.body.oldPassword, req.body.newPassword)
    .then((changedUser) => {
      res.send(ok(expose(changedUser)));
    })
    .catch((err) => {
      if (err.code === 400) return next(badRequest(null, err.message));
      return next(err);
    });
});


server.post('/login', auth.authHandler, (req, res) => res.send(ok(expose(req.user))));

server.get('/logout', auth.logout, (req, res) => res.send(ok()));

server.post('/register', (req, res, next) => {
  User.create({
    email: req.body.email,
  })
    .then((newUser) => {
      newUser.createToken();
      res.send(ok(expose.token(newUser)));
    })
    .catch(next);
});

server.get('/me', auth.validateCookie, (req, res) => res.send(ok(expose.info(req.user))));


server.put('/promote', (req, res) => {
  User.update({ accessLevel: req.body.accessLevel }, { where: { id: req.body.id } })
    .then(() => res.send(ok()));
});

server.get('/users', (req, res) => {
  User.findAll()
    .then(users => res.send(ok(users)))
    .catch(users => res.send(error(users)));
})

module.exports = server;
