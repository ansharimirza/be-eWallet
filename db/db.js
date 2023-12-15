const knex = require("knex");
const knexFile = require("../knexfile.js");
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const environment = process.env.NODE_ENV;

module.exports = knex(knexFile[environment]);