import  firebase from "firebase"
import "firebase/firebase-database";

const firebaseConfig = {
    apiKey: "AIzaSyBUUx90Up-eCs4gtjSq2-MpzVo8thpceN4",
    authDomain: "e-nyaay.firebaseapp.com",
    projectId: "e-nyaay",
    storageBucket: "e-nyaay.appspot.com",
    messagingSenderId: "1080009747636",
    appId: "1:1080009747636:web:6632a92b0a94ce285dbbe1",
    measurementId: "G-RYSTW51GH5"
};

firebase.initializeApp(firebaseConfig);

export default firebase;