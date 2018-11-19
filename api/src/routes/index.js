const { Router } = require('express');
// import all routers;
const authRouter = require('./auth.js');
const skyspotRouter = require('./skyspot.js');
const tripRouter = require('./trip.js');
const originRouter = require('./origin.js');
const destinationRouter = require('./destination.js');
const terminosRouter = require('./terminos.js');

const { validateCookie } = require('controllers/auth');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use('/auth', authRouter);
router.use('/skyspot', validateCookie, skyspotRouter);
router.use('/trip', validateCookie, tripRouter);
router.use('/origin', validateCookie, originRouter);
router.use('/destination', validateCookie, destinationRouter);
router.use('/terminos', validateCookie, terminosRouter);

module.exports = router;
