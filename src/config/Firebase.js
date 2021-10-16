import firebase from "firebase/compat/app"; //using compat in the new versions is mandatory!
import "firebase/compat/firestore"
import "firebase/compat/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDuOd8iJvNJi1LYGeeVjZXrqFrhDUV-RWU",
    authDomain: "meet-transcriber.firebaseapp.com",
    projectId: "meet-transcriber",
    storageBucket: "meet-transcriber.appspot.com",
    messagingSenderId: "954018788223",
    appId: "1:954018788223:web:647f6d0ba2636b7dcc604a",
    measurementId: "G-5S28K0FPS3"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };