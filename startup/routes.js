var express = require("express");
var app = express();

var parking = require("../controllers/parking.controller");

module.exports = function(app) {
    app.use("/api/parking", parking);
  };
  