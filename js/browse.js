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

	// Realtime listener to authinticate account and track login state
    firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			console.log('logged in');
			var email = firebaseUser.email;
            document.getElementById("disp-txt").innerHTML = email;
            btnLogout.classList.remove('hide');
            btnAccount.classList.remove('hide');
            btnReturn.classList.add('hide');
		}
		else{
			//console.log('not logged in');
            document.getElementById("disp-txt").innerHTML = "Sign up to save history";
            btnLogout.classList.add('hide');
            btnAccount.classList.add('hide');
			btnReturn.classList.remove('hide');
		}
	});
}());