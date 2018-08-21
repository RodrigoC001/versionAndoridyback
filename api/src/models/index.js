// Import all Models
// const db = require('./conn.js');
const User = require('./User.js');
const { Trip } = require('./Trip.js');
const { Skyspot } = require('./Skyspot.js');
const { Origin } = require('./Origin.js');
const { Destination } = require('./Destination.js');
const Terminos = require('./Terminos.js');

// Add Models relations here
// Trips & Skyspots
Trip.belongsToMany(Skyspot, {through: 'SkyspotTrip'});
Skyspot.belongsToMany(Trip, {through: 'SkyspotTrip'});
// Trips & Origin / Destination
Origin.hasMany(Trip, {as: 'RoutesOrigin'})
Destination.hasMany(Trip, {as: 'RoutesDestination'})

module.exports = { User, Trip, Skyspot, Origin, Destination };
