import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCL-NCq1jnZnTrOME0Lox4PD9ay3LLK0Xw",
  authDomain: "tpbuddy-aef41.firebaseapp.com",
  projectId: "tpbuddy-aef41",
  storageBucket: "tpbuddy-aef41.firebasestorage.app",
  messagingSenderId: "535405660972",
  appId: "1:535405660972:web:8ddf0cafbb5b2e532c3a89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Signup event listener
const signUp = document.getElementById('submit-signup');
if (signUp) {
  signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('create-password').value;
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: email,
          firstName: firstName,
          lastName: lastName,
        };
        showMessage('Account created successfully!', 'signup-message');
        
        return setDoc(doc(db, "users", user.uid), userData);
      })
      .then(() => {
        showLogin(); // Ensure `showLogin` is defined or provide feedback if transitioning forms
      })
      .catch((error) => {
        console.error("Error creating account or writing document", error);
        if (error.code === 'auth/email-already-in-use') {
          showMessage('Email already in use!', 'signup-message');
        } else if (error.code === 'auth/weak-password') {
          showMessage('Password too weak!', 'signup-message');
        } else {
          showMessage('Unable to create account', 'signup-message');
        }
      });
  });
}

// Login event listener
const logIn = document.getElementById('submit-login');
if (logIn) {
  logIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showMessage('Login successful!', 'login-message');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = '../index.html';
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        if (error.code === 'auth/wrong-password') {
          showMessage('Incorrect password', 'login-message');
        } else if (error.code === 'auth/user-not-found') {
          showMessage('No account found with this email', 'login-message');
        } else {
          showMessage('Login failed', 'login-message');
        }
      });
  });
}