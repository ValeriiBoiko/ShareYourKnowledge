import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDdc6aIMUk9lejyf9EEKE0Iz5ELxyl97YM",
  authDomain: "shareyourknowledge-31824.firebaseapp.com",
  databaseURL: "https://shareyourknowledge-31824.firebaseio.com",
  projectId: "shareyourknowledge-31824",
  storageBucket: "shareyourknowledge-31824.appspot.com",
  messagingSenderId: "894714443306",
  appId: "1:894714443306:web:424e5b24165fdc0700b553",
  measurementId: "G-QPXEN2N4WV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;