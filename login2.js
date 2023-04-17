const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express.Router();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "placement",
});

connection.connect((error) => {
  if (error) {
    console.log("Error connecting to MySQL database:", error);
  } else {
    console.log("Successfully connected to MySQL database!");
  }
});

app.post("/login", function (req, res) {
  var univid = req.body.univid;
  var password = req.body.password;

  var data = {
    univid: univid,
    password: password,
  };

  connection.query(
    "SELECT * FROM login WHERE univid = ?",
    [univid],
    function (err, rows, fields) {
      if (err) throw err;
      if (rows.length == 0) {
        return res.redirect("not_user.html");
      } else {
        if (rows[0].password !== password) {
          return res.redirect("invalid_pass.html");
        } else {
          return res.redirect("form.html");
        }
      }
    }
  );
});

app.get("/", function (req, res) {
  res.set({
    "Access-control-Allow-Origin": "*",
  });
  return res.redirect("index.html");
});

module.exports = app;
