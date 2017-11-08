function initApp() {
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      let name = user.name;
      let email = user.email;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
    } else {
      // User is signed out.
      document.getElementById("quickstart-sign-in-status").textContent =
        "Signed out";
      document.getElementById("quickstart-sign-in").textContent = "Sign in";
      document.getElementById("quickstart-account-details").textContent =
        "null";
    }
    document.getElementById("quickstart-sign-in").disabled = false;
  });

  // sign user in
  document
    .getElementById("quickstart-sign-in")
    .addEventListener("click", toggleSignIn, false);

  // sign user up
  document
    .getElementById("quickstart-sign-up")
    .addEventListener("click", handleSignUp, false);
}

// add user to db
function writeUserData(userId, name, email) {
  let database = firebase.database();
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      username: name,
      email: email
    });
}

// add photo info to db under respective user
function writePhotoData(userId, photoUrl, accuracyScore, description, tags) {
  let database = firebase.database();
  firebase
    .database()
    .ref("users/" + userId + "/photos/" + tags[0])
    .set({
      photo: photoUrl,
      confidence: accuracyScore,
      text: description,
      tags: tags
    });
}

function showCurrentUser() {
  let database = firebase.database();
  let userId = firebase.auth().currentUser.uid;
  return firebase
    .database()
    .ref("/users/" + userId)
    .once("value")
    .then(function(snapshot) {
      let username = (snapshot.val() && snapshot.val().username) || "Anonymous";

      // TODO: set navbar to username
    });
}

// export functions to use in other files
module.exports = {
  initApp: initApp,
  writeUserData: writeUserData,
  writePhotoData: writePhotoData,
  showCurrentUser: showCurrentUser
};
