import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCL-NCq1jnZnTrOME0Lox4PD9ay3LLK0Xw",
  authDomain: "tpbuddy-aef41.firebaseapp.com",
  projectId: "tpbuddy-aef41",
  storageBucket: "tpbuddy-aef41.appspot.com",
  messagingSenderId: "535405660972",
  appId: "1:535405660972:web:8ddf0cafbb5b2e532c3a89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

function signedInNB(userData) {
  document.getElementById('user-profile').style.display = 'block';
  document.getElementById('username').innerText = userData.firstName || 'User';
  document.getElementById('login-button').style.display = 'none';
  document.getElementById('logout-button').style.display = 'block';
}

function notSignedInNB() {
  document.getElementById('user-profile').style.display = 'none';
  document.getElementById('login-button').style.display = 'block';
  document.getElementById('logout-button').style.display = 'none';
}

onAuthStateChanged(auth, (user)=>{
  if (user){
    const docRef = doc(db, "users", user.uid);
    getDoc(docRef)
      .then((docSnap)=>{
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById('username').innerText = userData.firstName; // Show first name
          signedInNB(userData);
        } else {
          console.log("No document found matching id!");
          notSignedInNB();
        }
      })
      .catch((error)=>{
        console.log("Error getting document:", error);
      });
  } 
  else {
    console.log("No user logged in");
    notSignedInNB();
  }
});

const logoutButton = document.getElementById('logout-button');
if (logoutButton){
  logoutButton.addEventListener('click', ()=>{
    signOut(auth)
      .then(()=>{
        notSignedInNB();
        window.location.href = "index.html";
      })
      .catch((error)=>{
        console.log("Error signing out:", error);
      });
  });
};