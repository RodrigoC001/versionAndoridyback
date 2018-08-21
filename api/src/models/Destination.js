const db = require('db.js');
const S = require('sequelize');

const Destination = db.define('destination', {
  address: {
    type: S.STRING,
    allowNull: false
  }
});

module.exports = { Destination };