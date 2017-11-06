const express = require("express");
const router = express.Router();

// get a list of users from the db
router.get("/", function(req, res) {
  res.send({ type: "GET" });
});

// export for use in other files
module.exports = router;
