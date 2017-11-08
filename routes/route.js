const express = require("express");
const router = express.Router();
const firebase = require("firebase");

// middleware for checking current auth session
const MW = require("../middleware/auth");

// authenticate user
router.get("/", (req, res) => {
  res.render("auth");
});

// save photo info under current user
router.post("/save", (req, res) => {
  let url = req.body.url;
  let confidence = req.body.confidence;
  let text = req.body.text;
  let tags = req.body.tags;

  // initialize db instance to save info
  let database = firebase.database();
  let userId = firebase.auth().currentUser.uid;

  // save info
  firebase
    .database()
    .ref("user/" + userId + "/photos/" + tags[0])
    .push({
      url: url,
      confidence: confidence,
      text: text,
      tags: tags
    });

  res.redirect("/home");
});

// go to main page logged in as user
router.get("/home", MW.isAuthenticated, (req, res) => {
  res.render("index", {
    user: req.user
  });
});

// allow anonymous sign in for demo of application
router.get("/demo", (req, res) => {
  firebase
    .auth()
    .signInAnonymously()
    .then(authData => {
      res.redirect("/home");
    })
    .catch(error => {
      console.log("Error:");
      console.log("name:", error.name);
      console.log("message:", error.message);
    });
});

// create new user
router.post("/signup", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userRecord => {
      res.location("/user/" + userRecord.uid);
      res.status(201).end(res.redirect("/home"));
    })
    .catch(error => {
      res.write({
        code: error.code
      });
      res.status(401).end();
    });
});

// login as existing user
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(authData) {
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
router.get("/logout", MW.isAuthenticated, (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // logged out, redirect back to main page
      res.redirect("/");
    })
    .catch(error => {
      console.log(error.message);
    });
});

module.exports = router;
