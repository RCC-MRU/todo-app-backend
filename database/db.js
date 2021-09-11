const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql");

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.HOST || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.PASSWORD || "",
  database: process.env.PASSWORD || "todoapp",
});

module.exports = connection;
