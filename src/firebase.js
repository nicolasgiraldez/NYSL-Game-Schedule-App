import firebase from 'firebase';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR5W7FjtDQVIhSmPSldpClS_4dXMSLxHc",
  authDomain: "nysl-game-schedule-app.firebaseapp.com",
  databaseURL: "https://nysl-game-schedule-app.firebaseio.com",
  projectId: "nysl-game-schedule-app",
  storageBucket: "",
  messagingSenderId: "1099447516370",
  appId: "1:1099447516370:web:81335978eb5a4f29"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebase.database();