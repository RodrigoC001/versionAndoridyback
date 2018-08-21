const db = require('db.js');
const S = require('sequelize');

const Skyspot = db.define('skyspot', {
  name: {
    type: S.STRING,
    allownull: false
  },
  data: {
    type: S.TEXT,
    allownull: false
  },
  latitude: {
    type: S.DOUBLE,
    allowNull: false,
    validate: { min: -90, max: 90 },
  },
  longitude: {
    type: S.DOUBLE,
    allowNull: false,
    validate: { min: -190, max: 190 },
  }
});

module.exports = { Skyspot };