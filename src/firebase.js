import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBIhRif6i1E4MZ8DuVb9dkn27fqRO9fXn8",
  authDomain: "telegram-de6f2.firebaseapp.com",
  projectId: "telegram-de6f2",
  storageBucket: "telegram-de6f2.appspot.com",
  messagingSenderId: "945360326857",
  appId: "1:945360326857:web:9b7a8fb658b8cdd8f77d18",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
