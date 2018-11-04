//Replace editor
CKEDITOR.replace('editor1');

// Initialize Firebase
  let config = {
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
const resetForm = document.querySelector('.reset-form');

let currentUser = '';

//Toggle Forms
document.querySelector('.switch-to-signup').addEventListener('click', function(e){
    e.preventDefault();
    signupForm.style.display = 'block';
    signinForm.style.display = 'none';
    resetForm.style.display = 'none';
});
document.querySelector('.switch-to-signin').addEventListener('click', function(e){
    e.preventDefault();
    signupForm.style.display = 'none';
    signinForm.style.display = 'block';
    resetForm.style.display = 'none';
});
document.querySelector('.reset-password').addEventListener('click', function(e){
    e.preventDefault();
    signupForm.style.display = 'none';
    signinForm.style.display = 'none';
    resetForm.style.display = 'block';
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
        currentUser = user.name;
        let emailVerified = user.emailVerified;
        let photoURL = user.photoURL;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        let providerData = user.providerData;
        
        //Insert current user email in status element
        document.querySelector('.status').innerHTML = email + '<p class="signout">Sign Out</p>';
        document.querySelector('.want-to-signin').style.display = 'none';
        
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



//Forgot password
document.querySelector('.reset-submit').addEventListener('click', function(e){
    e.preventDefault();
    let auth = firebase.auth();
    let emailAddress = document.querySelector('.reset-email').value;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
        document.querySelector('.reset-error').innerHTML = 'An email with a link to reset your password has been sent.';
    }).catch(function(error) {
      // An error happened.
    });
});

//Check loggedin
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
        
        //Insert current user email in status element
        document.querySelector('.status').innerHTML = email + '<p class="signout">Sign Out</p>';
        document.querySelector('.want-to-signin').style.display = 'none';
        
        //Sign Out
        document.querySelector('.signout').addEventListener('click', function(){
            firebase.auth().signOut().then(function() {
                console.log('Signed Out');
                document.querySelector('.want-to-signin').style.display = 'block';
                document.querySelector('.status').innerHTML = '';
            }, function(error) {
                console.error('Sign Out Error', error);
            });
        });
        
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
            document.querySelector('.want-to-signin').style.display = 'block';
            signinForm.style.display = 'block';
    }
});

//Instantiate Database
let db = firebase.database();

//Database Insert
function blogPost(title, body, dateTime, author) {
  firebase.database().ref('blogposts/' + currentUser).set({
    title: title,
    body: body,
    date: dateTime
  });
}

//BlogPost
document.querySelector('.blogpost-submit').addEventListener('click', function(e){
    e.preventDefault();
    let title = document.querySelector('.blogpost-title').value;
    let body = document.querySelector('.blogpost-editor').value;
    console.log(body);
    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    let dateTime = dd + '/' + mm + '/' + yyyy;
    console.log(dateTime);
    let author = currentUser;
    blogPost(title, body, dateTime, author);
});