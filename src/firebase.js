import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBsgb5T4kedf74ZytMmYyiBPn09vbREV80",
    authDomain: "teachers-notebook.firebaseapp.com",
    databaseURL: "https://teachers-notebook.firebaseio.com",
    projectId: "teachers-notebook",
    storageBucket: "teachers-notebook.appspot.com",
    messagingSenderId: "390478140120"
};
firebase.initializeApp(config);

export default firebase;