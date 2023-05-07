 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
 import { GoogleAuthProvider, getAuth, signInWithPopup, OAuthProvider } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
 import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyDNQAcisehSD9ozX_Vzc4o54gdOxP2K3YM",
   authDomain: "v-nect-registration.firebaseapp.com",
   projectId: "v-nect-registration",
   storageBucket: "v-nect-registration.appspot.com",
   messagingSenderId: "78346752196",
   appId: "1:78346752196:web:30c5c7dad57250c96e7991",
   measurementId: "G-Q5ZXK57J3Z"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const database = getDatabase(app);
 const auth = getAuth(app);
 const googleProvider = new GoogleAuthProvider(app);
 const microsoftProvider = new OAuthProvider('microsoft.com');

 signUp.addEventListener('click',()=>{
   
   var username = document.getElementById('username').value;
   var email = document.getElementById('email').value;
   var password = document.getElementById('password').value;

   createUserWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
   // Signed in 
           const user = userCredential.user;

           set(ref(database, 'users/' + user.uid),{
               username: username,
               email: email,
           })
           alert('User Created');
   // ...
       })
       .catch((error) => {
           const errorMessage = error.message;

           alert(errorMessage);
   // ..
       });

 });

//MICROSOFT
  //  microsoft.addEventListener('click',(e)=>{
  //   signInWithPopup(auth, microsoftProvider)
  //   .then((result) => {
  //     // User is signed in.
  //     // IdP data available in result.additionalUserInfo.profile.
  
  //     // Get the OAuth access token and ID Token
  //     const credential = OAuthProvider.credentialFromResult(result);
  //     const accessToken = credential.accessToken;
  //     const idToken = credential.idToken;
  //   })
  //   .catch((error) => {
  //     // Handle error.
  //   });
  //  });

  // GOOGLE
  google.addEventListener('click',(e)=>{
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      alert(user.displayName);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert(errorMessage);
    });
  
  });
  login.addEventListener('click', ()=>{
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;
 
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
    // Signed in 
                const user = userCredential.user;
 
                const dt = new Date();
                update(ref(database, 'users/' + user.uid),{
                    last_login: dt,
                })
                alert('User Logged In!');
    // ...
        })
        .catch((error) => {
            const errorMessage = error.message;
 
            alert(errorMessage);
        });
 
    });

