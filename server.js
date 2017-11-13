const express = require("express");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const path = require("path");

const routes = require("./routes/route");

// Firebase
const firebase = require("firebase");

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD9XtDdCDNqqPkTlTZNqy26lTb5lm03ykU",
  authDomain: "impression-web.firebaseapp.com",
  databaseURL: "https://impression-web.firebaseio.com/",
  storageBucket: "gs://impression-web.appspot.com"
};
firebase.initializeApp(config);

// setup express app
const app = express();

// setup views engine (needed for rendering page content)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// display favicon for all pages in views
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use static assets in public directory
app.use(express.static(path.join(__dirname, "public")));

// use routes for handling actions
app.use("/", routes);

// handle any 404 errors
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// show errors in development
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// listen for requests
const port = process.env.port || 4000;
app.listen(port, () => {
  console.log("Listening for requests on PORT:", port);
});
