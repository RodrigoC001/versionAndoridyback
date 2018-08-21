const db = require('db.js');
const S = require('sequelize');

const Origin = db.define('origin', {
  address: {
    type: S.STRING,
    allowNull: false
  }
});

module.exports = { Origin };