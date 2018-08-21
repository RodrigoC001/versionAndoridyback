const { Router } = require('express');
// import all routers;
const authRouter = require('./auth.js');
const skyspotRouter = require('./skyspot.js');
const tripRouter = require('./trip.js');
const originRouter = require('./origin.js');
const destinationRouter = require('./destination.js');


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use('/auth', authRouter);
router.use('/skyspot', skyspotRouter);
router.use('/trip', tripRouter);
router.use('/origin', originRouter);
router.use('/destination', destinationRouter);

module.exports = router;
