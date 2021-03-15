import firebase from "firebase";



var firebaseConfig = {
  apiKey: "AIzaSyA-vbNxaoQ7VELGobjm2AAwIPv0b4A6OAI",
  authDomain: "bt3103-week-6-d4ace.firebaseapp.com",
  projectId: "bt3103-week-6-d4ace",
  storageBucket: "bt3103-week-6-d4ace.appspot.com",
  messagingSenderId: "435880871155",
  appId: "1:435880871155:web:c36a6f0857628d989b2386",
  measurementId: "G-0FT9YPMPVZ"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;