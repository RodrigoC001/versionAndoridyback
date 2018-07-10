const User = require('models/User');
const RedisSessions = require('redis-sessions');
const { forbidden, unauthorized } = require('utils/').responses;

const redisHost = 'redis';
const rs = new RedisSessions({ host: redisHost, wipe: 0 });
const rsapp = 'pledu';

function authSuccess(req, res, next, user) {
  return rs.create({
    app: rsapp,
    id: user.id,
    ip: req.connection.remoteAddress,
  }, (error, resp) => {
    req.user = user;
    res.status(200);
    res.cookie('authorization', resp.token);
    return next(error);
  });
}
// show fail page (login)
function authFail(res, error) {
  res.status(401);
  res.clearCookie('authorization');
  // res.writeHead(401, {'content-type': 'application/json'});
  if (!error) return res.send(unauthorized());
  return res.send(error);
}
// Login
function authHandler(req, res, next) {
  if (!req.body.email || !req.body.password) return authFail(res);
  return User.authenticate(req.body.email, req.body.password)
    .then((reply) => {
      // Add Expose Library
      if (reply) return authSuccess(req, res, next, reply);
      return authFail(res);
    }).catch(err => authFail(res, err.message));
}

// for subsequents requests
function validateCookie(req, res, next) {
  const cookie = req.cookies.authorization || null;
  rs.get({
    app: rsapp,
    token: cookie,
  }, (err, resp) => {
    if (!resp) return authFail(res);
    return User.findOne({ where: { id: resp.id } })
      .then((user) => {
        if (!user) return authFail(res);
        req.user = user;
        return next();
      });
  });
}


// Logout
function logout(req, res) {
  // invalidate the token
  const cookie = req.cookies.authorization ? req.cookies.authorization : null;
  rs.kill({
    app: rsapp,
    token: cookie,
    ttl: 0,
  }, (err, resp) => {
    if (!resp) return authFail(res);
    res.clearCookie('authorization');
    return res.send({ message: 'Succesfully logout.' });
  });
}

function isAdmin(req, res, next) {
  return req.user.accessLevel === 2 ? next() : next(forbidden());
}

module.exports = {
  authHandler,
  logout,
  validateCookie,
  isAdmin,
};
