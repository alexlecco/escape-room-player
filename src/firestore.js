import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDWV0foqQbIYZ_YYJHvlIZXVN5M6GWqMmU",
    authDomain: "rolling-bank.firebaseapp.com",
    databaseURL: "https://rolling-bank.firebaseio.com",
    projectId: "rolling-bank",
    storageBucket: "rolling-bank.appspot.com",
    messagingSenderId: "634920655634",
    appId: "1:634920655634:web:7f608849fcecfd1b75b1cb",
    measurementId: "G-FB2FTMK6H5"
};

firebase.initializeApp(firebaseConfig)

export default firebase