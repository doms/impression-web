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
    
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const newEmail = document.getElementById('newEmail');
    const newPassword = document.getElementById('newPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');
    
    // Add login event for btnLookUp button
	btnReturn.addEventListener('click', e => {
		window.location.href="browse.html";
	});
}());