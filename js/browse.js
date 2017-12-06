var userEmail;
var userID; 
(function () {
	// Initialize Firebase
    var config = {
        apiKey: "AIzaSyAZ0HSEZD3KJevSHvgXB4rIJxMqvWLvO9I",
        authDomain: "my-impressions.firebaseapp.com",
        databaseURL: "https://my-impressions.firebaseio.com",
        projectId: "my-impressions",
        storageBucket: "my-impressions.appspot.com",
        messagingSenderId: "37335912302"
    };
    firebase.initializeApp(config);

	// Logout button
	const btnLogout = document.getElementById('btnLogout');
     
	// On clicking logout
	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut();
		window.location.href="index.html";
	})
    
    // On clicking home button
	btnReturn.addEventListener('click', e => {
		firebase.auth().signOut();
		window.location.href="index.html";
	})
    
    // Go to account page
	btnAccount.addEventListener('click', e => {
		window.location.href="account.html";
	});

	// Real-time listener to authenticate account and track login state
    firebase.auth().onAuthStateChanged(firebaseUser =>{
        
		if(firebaseUser){
			console.log('logged in');
			var email = firebaseUser.email;
            userID = firebaseUser.uid;
            userEmail = email;
            document.getElementById("disp-txt").innerHTML = email;
            btnLogout.classList.remove('hide');
            btnAccount.classList.add('hide');
            btnSave.classList.remove('hide');
            btnReturn.classList.add('hide');
		}
		else{
            document.getElementById("disp-txt").innerHTML = "Sign up to save history";
            btnLogout.classList.add('hide');
            btnAccount.classList.add('hide');
            btnSave.classList.add('hide');
			btnReturn.classList.remove('hide');
		}
	});
}());

// Saving Data
function writeUserData() {
    // A image entry.
    var postData = {
        User_Email: userEmail,
        Image_URL : pleaseWork,
        Results_Microsoft : micRes,
        Results_Google : gooRes,
        Image_Description: descrip
    };

    // Get a key for a new image.
    var newPostKey = firebase.database().ref().child('images').push().key;

    // Write the new image's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/images/' + newPostKey] = postData;
    updates['/user-images/' + userID + '/' + newPostKey] = postData;
    
    alert("Image Saved...");
    return firebase.database().ref().update(updates);
}