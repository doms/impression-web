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

	// Get all the login elements defined in index.html
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const btnLookUp = document.getElementById('btnLookUp');

    // Add login event for btnLookUp button
	btnLookUp.addEventListener('click', e => {
		window.location.href="browse.html";
	});
    
	// Add login event for btnLogin button
	btnLogin.addEventListener('click', e => {
		// Get email and password field values
		const email = txtEmail.value;
		const pass = txtPassword.value;
		// Store it to firebase
		const auth = firebase.auth();
		// Sign in, returns a promis that verifies user...
		const promise = auth.signInWithEmailAndPassword(email, pass);
		//  or catches error
		promise.catch(e => console.log(e.message));
	});

	// Add signup event for btnSignUp button
	btnSignUp.addEventListener('click', e => {
		// Get email and password field values
		// TODO: CHECK 4 REAL EMAIL!
		const email = txtEmail.value;
		const pass = txtPassword.value;		// Checks that passworkd is => 6chars
		// Store it to firebase
		const auth = firebase.auth();
		// Sign in, returns a promis that verifies user...
		const promise = auth.createUserWithEmailAndPassword(email, pass);
		//  or catches errors but doesn't catch change in login state
		promise.catch(e => console.log(e.message));
	});

	// Realtime listener to authinticate account and track login state
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			console.log('logged in');
			//document.getElementById('btnLogout').style.visibility = 'visible';
			window.location.href="browse.html";
		}
		else{
			console.log('not logged in');
			//document.getElementById('btnLogout').style.visibility = 'hidden';
		}
	});
	
}());