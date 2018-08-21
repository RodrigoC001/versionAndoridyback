const db = require('db.js');
const S = require('sequelize');

const Trip = db.define('trip', {
  name: {
    type: S.STRING,
    allowNull: false,
  }
});

module.exports = { Trip };