const mysql2 = require("mysql2");

const sql = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Admin@123",
  database: "USER",
});

module.exports = { sql };
