const firebase = require("firebase");

// check current state of whether a user is logged in or not
module.exports = {
  isAuthenticated: (req, res, next) => {
    let user = firebase.auth().currentUser;
    if (user !== null) {
      req.user = user;
      next();
    } else {
      res.redirect("/");
    }
  }
};
