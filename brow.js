(function(){

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
			console.log('Switch to index');
	})

	// Realtime listener to authinticate account and track login state
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			console.log('logged in');
			document.getElementById('btnLogout').style.visibility = 'visible';
		}
		else{
			console.log('not logged in');
			document.getElementById('btnLogout').style.visibility = 'hidden';
		}
	});
	
}());