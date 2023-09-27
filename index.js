require("dotenv").config();
const mysql = require("mysql2");
const express = require("express");
const app = express();
const cors = require("cors");

const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "hhcodingschool_finalproject",
});

app.use(cors());

app.get("/cities", function (req, res) {
  const sql = `SELECT * FROM visitedcities`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.json({
      status: "OK",
      count: result.length,
      result,
    });
  });
});

app.get("/cities/:city?", function (req, res) {
  let id = req.params.city;
  let sql = `SELECT * FROM visitedcities WHERE City="${req.params.city}"`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.json("An error occurred.");
      return;
    }
    res.json(result);
  });
});

app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
