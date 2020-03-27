var express = require("express");
var router = express.Router();

router.get("/info", async (req, res) => {
    try {
      return res.status(200).send("Connected to Server Successfully");
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });


module.exports = router;