// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDt_a9f_Qs0emOoHsBJfCJgZL7klWsjs2s",
    authDomain: "labo-5-jonasstasseyns.firebaseapp.com",
    databaseURL: "https://labo-5-jonasstasseyns.firebaseio.com",
    projectId: "labo-5-jonasstasseyns",
    storageBucket: "labo-5-jonasstasseyns.appspot.com",
    messagingSenderId: "990615949351"
  };
  firebase.initializeApp(config);

const signupForm = document.querySelector('.signup-form');
const signinForm = document.querySelector('.signin-form');

//Toggle Forms
document.querySelector('.switch-to-signup').addEventListener('click', function(e){
    e.preventDefault();
    signupForm.style.display = 'block';
    signinForm.style.display = 'none';
});
document.querySelector('.switch-to-signin').addEventListener('click', function(e){
    e.preventDefault();
    signupForm.style.display = 'none';
    signinForm.style.display = 'block';
});

//Register
document.querySelector('.signup-submit').addEventListener('click', function(e){
    e.preventDefault();
    let registerFormEmail = document.querySelector('.signup-email').value;
    let registerFormPass = document.querySelector('.signup-password').value;
    console.log(registerFormEmail + registerFormPass);
    firebase.auth().createUserWithEmailAndPassword(registerFormEmail, registerFormPass).catch(function(error) {
        document.querySelector('.signup-error').innerHTML = error.message;
    });
});

//Login
document.querySelector('.signin-submit').addEventListener('click', function(e){
    e.preventDefault();
    let signinFormEmail = document.querySelector('.signin-email').value;
    let signinFormPass = document.querySelector('.signin-password').value;
    firebase.auth().signInWithEmailAndPassword(signinFormEmail, signinFormPass).catch(function(error) {
      document.querySelector('.signin-error').innerHTML = error.message;
    });
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        let displayName = user.displayName;
        let email = user.email;
        let emailVerified = user.emailVerified;
        let photoURL = user.photoURL;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        let providerData = user.providerData;
        
        if(!emailVerified){
            user.sendEmailVerification().then(function() {
              // Email sent.
            }).catch(function(error) {
              // An error happened.
            });
        }else{
            console.log('verified');
        }
        
        } else {
        // User is signed out.
        // ...
    }
});

});


//Send verification mail after first sign-in
//let user = firebase.auth().currentUser;
//
//user.sendEmailVerification().then(function() {
//  // Email sent.
//}).catch(function(error) {
//  // An error happened.
//});