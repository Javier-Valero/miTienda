// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzvF4nteNebPNQHxdL61O2qElFGSxW4FQ",
  authDomain: "locust-a0ff0.firebaseapp.com",
  projectId: "locust-a0ff0",
  storageBucket: "locust-a0ff0.appspot.com",
  messagingSenderId: "272333620240",
  appId: "1:272333620240:web:7f75c7d53a5c9cc833f695"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth();
const functions = getFunctions();

export { auth, functions };
