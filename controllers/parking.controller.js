var express = require("express");
var router = express.Router();

var redis = require('redis');
var client = redis.createClient(6379);

// var client = require('../startup/db');
// var client;

router.get("/info", async (req, res) => {
    try {
      return res.status(200).send("Connected to Server Successfully");
    } catch (error) {
      return res.status(400).send(error.message);
    }
});

router.post("/set-key", (req, res) => {
    let key = req.body.key;
    client.get(key, function (error, result) {
        if (error) {
            console.log(error);
            res.status(503).send({ error: "DB Error:(" });
            throw error;
        } else {
            console.log('GET result ->' + result);
            res.status(200).send({ value: result});
        }
    });
});

// const setClient = (inClient) => { 
//     client = inClient; 
// }


module.exports = router;
// module.exports = {
//     router, setClient
//    }