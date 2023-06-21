const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "teachers",
  password: "456852",
  port: "5432",
});

module.exports = pool;
