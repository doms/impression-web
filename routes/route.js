const express = require("express");
const router = express.Router();
const firebase = require("firebase");

// middleware for checking current auth session
const MW = require("../middleware/auth");

// authenticate user
router.get("/", function(req, res, next) {
  //   res.render("index");
  res.render("auth"); // require sign in
});

// save photo info under current user
router.post("/save", function(req, res, next) {
  // get photo info
  let photoUrl = req.body.url;
  let confidence = req.body.confidence;
  let text = req.body.description;
  let tags = req.body.tags;

  // initialize db instance to save info
  let database = firebase.database();
  let userId = firebase.auth().currentUser.uid;

  // save info
  firebase
    .database()
    .ref("users/" + userId + "/photos/" + tags[0])
    .push({
      photo: photoUrl,
      confidence: accuracyScore,
      text: description,
      tags: tags
    });
});

// go to main page logged in as user
router.get("/home", MW.isAuthenticated, function(req, res, next) {
  res.render("index", {
    user: req.user
  });
});

// allow anonymous sign in for demo of application
router.post("/demo", function(req, res, next) {
  firebase
    .auth()
    .signInAnonymously()
    .then(function(authData) {
      console.log(authData);
      res.redirect("/home");
    })
    .catch(function(error) {
      console.log("Error:");
      console.log("name:", error.name);
      console.log("message:", error.message);
    });
});

// create new user
router.post("/signup", function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  // DEBUG: checking for email and password
  console.log(`Email: ${email} Password: ${password}`);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(userRecord) {
      res.location("/user/" + userRecord.uid);
      res.status(201).end(res.redirect("/home"));
    })
    .catch(function(error) {
      res.write({
        code: error.code
      });
      res.status(401).end();
    });
});

// login as existing user
router.post("/login", function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(authData) {
      console.log(authData);
      res.redirect("/home");
    })
    .catch(function(error) {
      console.log("Error:");
      console.log("name:", error.name);
      console.log("message:", error.message);

      // couldn't log in, log error and redirect back to main page
      res.redirect("/");
    });
});

// logout as current user
router.get("/logout", MW.isAuthenticated, function(req, res, next) {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log("Logging out of session...");

      // logged out, redirect back to main page
      res.redirect("/");
    })
    .catch(function(error) {
      console.log(error.message);
    });
});

module.exports = router;
