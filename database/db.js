require("dotenv").config({ path: "./.env" });
const mysql = require("mysql");

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.HOST || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.PASSWORD || "",
  database: process.env.DB || "todoapp",
});

module.exports = connection;
