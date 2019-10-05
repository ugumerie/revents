import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBI1l9dhS8O2WAVO1k6SfgLZF0925Cg7xQ",
    authDomain: "revents-ff8ab.firebaseapp.com",
    databaseURL: "https://revents-ff8ab.firebaseio.com",
    projectId: "revents-ff8ab",
    storageBucket: "revents-ff8ab.appspot.com",
    messagingSenderId: "1080285370686",
    appId: "1:1080285370686:web:785d4845747b62d294f46f",
    measurementId: "G-66YKRJVTVN"
  };

  firebase.initializeApp(firebaseConfig)
  firebase.firestore()

  export default firebase

  