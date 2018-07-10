// Import all Models
const db = require('./conn.js');
const User = require('./User.js');

const setup = db.sync({ force: true })
  .then(() => {
    // Add Models relations here
  });
module.exports = { setup, User };
