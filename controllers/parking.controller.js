var express = require("express");
var router = express.Router();

var redis = require("redis");
var client = redis.createClient(6379);

var async = require("async");

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
  client.get(key, function(error, result) {
    if (error) {
      console.log(error);
      res.status(503).send({ error: "DB Error:(" });
      throw error;
    } else {
      console.log("GET result ->" + result);
      res.status(200).send({ value: result });
    }
  });
});

// router.get("/a", (req, res) => {
//   var arr = [];
//   client.keys("park*", function(e, keys) {
//     if (e) {
//       console.log(e);
//       res.status(503).send({ error: "key Error:(" });
//       throw error;
//     }
//     client.mget(keys, function(err, values) {
//       if (err) {
//         console.log(err);
//         res.status(503).send({ error: "mget Error:(" });
//         throw error;
//       }
//       console.log(values);
//       res.status(200).send({ values: values, keys: keys });
//       //   callback(values);
//     });
//   });
// });

router.get("/a", (req, res) => {
  // var arr = [];
  // client.keys("*", function(e, keys) {
  //   if (e) {
  //     console.log(e);
  //     res.status(503).send({ error: "key Error:(" });
  //     throw error;
  //   }
  //   client.mget(keys, function(err, values) {
  //     if (err) {
  //       console.log(err);
  //       res.status(503).send({ error: "mget Error:(" });
  //       throw error;
  //     }
  //     console.log(values);
  //     res.status(200).send({ values: values, keys: keys });
  //     //   callback(values);
  //   });
  // });

  client.keys("*", function(err, keys) {
    if (err) return console.log(err);
    if (keys) {
      async.map(
        keys,
        function(key, cb) {
          client.hgetall(key, function(error, value) {
            if (error) return cb(error);
            cb(null, value);
          });
        },
        function(error, results) {
          if (error) return console.log(error);
          res.json({ values: results });
        }
      );
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
