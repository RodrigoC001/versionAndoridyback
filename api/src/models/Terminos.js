const db = require('db.js');
const S = require('sequelize');

const Terminos = db.define('terminos', {
  terms: {
    type: S.TEXT,
    allowNull: true,
  },
  privacy: {
    type: S.TEXT,
    allowNull: true,
  },
  about: {
    type: S.TEXT,
    allowNull: true,
  },
});

module.exports = Terminos;

