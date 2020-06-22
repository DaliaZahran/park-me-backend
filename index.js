const express = require("express");
// const { mongoose } = require('./startup/db.js');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
require("./startup/routes.js")(app);

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log("server working");
});

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.static("public"));

var redis = require("redis");
var client = redis.createClient(6379);

var parkings = [
  {
    UUID: "001001",
    pNo: "1",
    name: "Mall of Arabia Parking 1",
    address: "26 of July, 6th of October",
    lat: 30.0086152969932,
    long: 30.9730808455763,
    lotNo: "1",
    status: "0",
    price: "5",
    timestamp: "2020-06-13 07:59:49.139354",
  },
  {
    UUID: "001002",
    pNo: "1",
    name: "Mall of Arabia Parking 1",
    address: "26 of July, 6th of October",
    lat: 30.0086152969932,
    long: 30.9730808455763,
    lotNo: "2",
    status: "1",
    price: "5",
    timestamp: "2020-06-13 07:59:49.139354",
  },
  {
    UUID: "001003",
    pNo: "1",
    name: "Mall of Arabia Parking 1",
    address: "26 of July, 6th of October",
    lat: 30.0086152969932,
    long: 30.9730808455763,
    lotNo: "3",
    status: "1",
    price: "3",
    timestamp: "2020-06-13 07:59:49.139354",
  },
  {
    UUID: "002001",
    pNo: "2",
    name: "Mall of Arabia Parking 2",
    address: "26 of July, 6th of October",
    lat: 30.0076834290967,
    long: 30.9719208212758,
    lotNo: "1",
    status: "0",
    price: "4",
    timestamp: "2020-06-13 07:59:49.139354",
  },
];

client.keys("*", function (err, keys) {
  if (err) return console.log(err);
  console.log(keys);
  if (keys.length == 0) {
    parkings.forEach((item) => {
      client.hmset(item.UUID, item, function (err, res) {
        if (err) return console.log(err);
        console.log(res);
      });
    });
    console.log("Inserted");
  }
});
