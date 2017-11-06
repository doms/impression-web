const firebase = require("firebase");

// check current state of whether a user is logged in or not
module.exports = {
  isAuthenticated: function(req, res, next) {
    var user = firebase.auth().currentUser;
    if (user !== null) {
      req.user = user;
      next();
    } else {
      res.redirect("/");
    }
  }
};
