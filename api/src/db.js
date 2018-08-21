const Sequelize = require('sequelize');

const password = process.env.POSTGRES_PASSWORD;
const user = process.env.POSTGRES_USER;
const database = process.env.POSTGRES_DB;
const host = 'pg';
const connectionString = `postgres://${user}:${password}@${host}/${database}`;

const db = new Sequelize(connectionString, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

module.exports = db;
