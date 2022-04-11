import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBb9eHDYyX9DjtluJXZuFfDC4VMjOBqOyI",
  authDomain: "mt02-9e1b9.firebaseapp.com",
  projectId: "mt02-9e1b9",
  storageBucket: "mt02-9e1b9.appspot.com",
  messagingSenderId: "216456856011",
  appId: "1:216456856011:web:06b7083f2d6d55f347764e"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
