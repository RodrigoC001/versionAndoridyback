const db = require('db.js');
const S = require('sequelize');

const Terminos = db.define('terminos', {
  termsAndPrivacy: {
    type: S.TEXT,
    allowNull: true,
  },
  faq: {
    type: S.TEXT,
    allowNull: true,
  }
});

module.exports = Terminos;

