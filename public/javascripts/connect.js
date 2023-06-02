var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"gold"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Your DataBase is Connected!");
});

module.exports = con;