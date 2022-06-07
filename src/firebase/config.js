import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrBQRBvESDuB8DhjFXAHqDjuSh4LKERek",
  authDomain: "cooking-ninja-site-20b15.firebaseapp.com",
  projectId: "cooking-ninja-site-20b15",
  storageBucket: "cooking-ninja-site-20b15.appspot.com",
  messagingSenderId: "527230834559",
  appId: "1:527230834559:web:59c1d819512511c495ac4a",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init firestore
const projectFirestore = firebase.firestore();

export { projectFirestore };
