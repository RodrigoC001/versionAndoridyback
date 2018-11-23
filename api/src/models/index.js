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
Trip.belongsToMany(Skyspot, {through: 'skyspot_trip'});
Skyspot.belongsToMany(Trip, {through: 'skyspot_trip'});

// Trips & Origin / Destination
Origin.hasMany(Trip, {as: 'routes_origin', foreignKey: 'originId'})
Destination.hasMany(Trip, {as: 'routes_destination', foreignKey: 'destinationId'})
Trip.belongsTo(Origin, {foreignKey: 'originId'})
Trip.belongsTo(Destination, {foreignKey: 'destinationId'})

module.exports = { User, Trip, Skyspot, Origin, Destination, Terminos };

