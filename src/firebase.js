import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCdULIuVTplF_Srv5Kitoz1g5Jfyb87xiw",
  authDomain: "mitienda-66309.firebaseapp.com",
  databaseURL: "https://mitienda-66309-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mitienda-66309",
  storageBucket: "mitienda-66309.appspot.com",
  messagingSenderId: "365054979097",
  appId: "1:365054979097:web:9a67249918393450648e88"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
