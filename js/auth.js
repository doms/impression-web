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
	btnLookUp.addEventListener('click', e => {
		window.location.href="browse.html";
	});
    
    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => alert(e.message));
    });
    
    btnSignUp.addEventListener('click', e => {
        const email = newEmail.value;
        const pass = newPassword.value;
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => alert(e.message));
    });
    
    // On clicking logout
	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut();
	})
    
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            window.location.href="browse.html";
            btnLogout.classList.remove('hide');
        }
        else{
            alert('not logged in');
            btnLogout.classList.add('hide');
        }
    });
}());



