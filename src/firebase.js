import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBb9eHDYyX9DjtluJXZuFfDC4VMjOBqOyI",
  authDomain: "mt02-9e1b9.firebaseapp.com",
  projectId: "mt02-9e1b9",
  storageBucket: "mt02-9e1b9.appspot.com",
  messagingSenderId: "216456856011",
  appId: "1:216456856011:web:06b7083f2d6d55f347764e"
};

/* const firebaseConfig = {
  apiKey: "AIzaSyCdULIuVTplF_Srv5Kitoz1g5Jfyb87xiw",
  authDomain: "mitienda-66309.firebaseapp.com",
  databaseURL: "https://mitienda-66309-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mitienda-66309",
  storageBucket: "mitienda-66309.appspot.com",
  messagingSenderId: "365054979097",
  appId: "1:365054979097:web:9a67249918393450648e88"
}; */

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
