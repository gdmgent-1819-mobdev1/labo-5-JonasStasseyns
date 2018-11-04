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

//Notification
console.log(Notification.permission);
document.querySelector('.not').addEventListener('click', function(){
    Notification.requestPermission();
    setTimeout(function(){
        console.log(Notification.permission);
    }, 3000);
});

//Register
document.querySelector('.register-submit').addEventListener('click', function(){
    let registerFormEmail = document.querySelector('.register-email').value;
    let registerFormPass = document.querySelector('.register-password').value;
    console.log(registerFormEmail + registerFormPass);
    firebase.auth().createUserWithEmailAndPassword(registerFormEmail, registerFormPass).catch(function(error) {
      console.log(error.message);
    });
});

//Login
document.querySelector('.signin-submit').addEventListener('click', function(){
    let signinFormEmail = document.querySelector('.signin-email').value;
    let signinFormPass = document.querySelector('.signin-password').value;
    firebase.auth().signInWithEmailAndPassword(signinFormEmail, signinFormPass).catch(function(error) {
      console.log(error.message);
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