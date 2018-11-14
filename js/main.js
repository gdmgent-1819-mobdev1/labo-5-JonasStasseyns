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
document.querySelector('.switch-to-signup').addEventListener('click', function (e) {
    e.preventDefault();
    signupForm.style.display = 'block';
    signinForm.style.display = 'none';
    resetForm.style.display = 'none';
});
document.querySelector('.switch-to-signin').addEventListener('click', function (e) {
    e.preventDefault();
    signupForm.style.display = 'none';
    signinForm.style.display = 'block';
    resetForm.style.display = 'none';
});
document.querySelector('.reset-password').addEventListener('click', function (e) {
    e.preventDefault();
    signupForm.style.display = 'none';
    signinForm.style.display = 'none';
    resetForm.style.display = 'block';
});

document.querySelector('.want-to-signin').addEventListener('click', function(){
    signinForm.style.display = 'block';
});

//Register
document.querySelector('.signup-submit').addEventListener('click', function (e) {
    e.preventDefault();
    let registerFormEmail = document.querySelector('.signup-email').value;
    let registerFormPass = document.querySelector('.signup-password').value;
    console.log(registerFormEmail + registerFormPass);
    firebase.auth().createUserWithEmailAndPassword(registerFormEmail, registerFormPass).catch(function (error) {
        document.querySelector('.signup-error').innerHTML = error.message;
    });
});

//Login
document.querySelector('.signin-submit').addEventListener('click', function (e) {
    e.preventDefault();
    let signinFormEmail = document.querySelector('.signin-email').value;
    let signinFormPass = document.querySelector('.signin-password').value;
    firebase.auth().signInWithEmailAndPassword(signinFormEmail, signinFormPass).then(function(){
        checkLoggedIn();
    }).catch(function (error) {
        document.querySelector('.signin-error').innerHTML = error.message;
    });
});

//Forgot password
document.querySelector('.reset-submit').addEventListener('click', function (e) {
    e.preventDefault();
    let auth = firebase.auth();
    let emailAddress = document.querySelector('.reset-email').value;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        document.querySelector('.reset-error').innerHTML = 'An email with a link to reset your password has been sent.';
    }).catch(function (error) {
        // An error happened.
    });
});

//Check loggedin
function checkLoggedIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            
            // User is signed in.
            let email = user.email;
            let emailVerified = user.emailVerified;

            //Make elements (in)visible on login
            document.querySelector('.status').innerHTML = email + '<p class="signout">Sign Out</p>';
            currentUser = email;
            document.querySelector('.want-to-signin').style.display = 'none';
            document.querySelector('.post-form-toggle').style.display = 'block';
            signinForm.style.display = 'none';
            
            //Sign Out
            document.querySelector('.signout').addEventListener('click', function () {
                firebase.auth().signOut().then(function () {
                    checkLoggedIn();
                }, function (error) {
                    console.error('Sign Out Error', error);
                });
            });

            if (!emailVerified) {
                user.sendEmailVerification();
            } else {
                console.log('verified');
            }
            
            firebaseRead();
            
        } else {
            document.querySelector('.post-form').style.display = 'none';
            currentUser = null;
            document.querySelector('.status').innerHTML = '';
            document.querySelector('.want-to-signin').style.display = 'block';
            document.querySelector('.post-form-toggle').style.display = 'none';
            firebaseRead();
        }
        
        
        
    });
}

//Insert Blogpost into database
function blogPost(title, body, dateTime, author) {
    firebase.database().ref('blogposts').push({
        title: title,
        body: body,
        date: dateTime,
        author: author
    });
}

//Create BlogPost
document.querySelector('.blogpost-submit').addEventListener('click', function (e) {
    e.preventDefault();
    let title = document.querySelector('.blogpost-title').value;
    let body = CKEDITOR.instances.editor1.getData();
    console.log(body);
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let dateTime = dd + '/' + mm + '/' + yyyy;
    console.log(dateTime);
    let author = currentUser;
    console.log(author);
    blogPost(title, body, dateTime, author);
    firebaseRead();
});

//Toggle BlogPost Form Visibility
document.querySelector('.post-form-toggle').addEventListener('click', function () {
    let currentState = getComputedStyle(document.querySelector('.post-form')).display;
    if (currentState == 'none') {
        document.querySelector('.post-form').style.display = 'block';
        console.log('none > block');
    } else if (currentState == 'block') {
        document.querySelector('.post-form').style.display = 'none';
        console.log('block > none');
    }
});

//Blogpost read
function firebaseRead() {
    document.querySelector('.postcontainer').innerHTML = '';
    let leadsRef = firebase.database().ref('blogposts');
    leadsRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            let content = '';
            content += '<h1>' + data.title + '</h1>';
            content += '<p class="authortime">' + data.author + ' - ' + data.date + '</p>';
            content += '<p>' + data.body + '</p>';
            if(data.author == currentUser){
                content += '<button id="' + childSnapshot.key + '" class="remove-btn">Remove</button><button id="' + childSnapshot.key + '" class="edit-btn">Edit post</button><hr class="inter-post">';
            }

            document.querySelector('.postcontainer').insertAdjacentHTML('afterbegin', content);
        });
        renderEventListeners();
    });
}

function renderEventListeners() {
    let removeButtons = document.querySelectorAll('.remove-btn');
    for (i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', remove);
    }
    let editButtons = document.querySelectorAll('.edit-btn');
    for(butotn in editButtons){
        button.addEventListener('click', showPostEditor);
    }
}

function remove(event) {
    let key = event.currentTarget.id;
    console.log(key);
    firebase.database().ref('blogposts/' + key).remove();
    firebaseRead();
}

function showPostEditor(){

}

//Default Calls
checkLoggedIn();