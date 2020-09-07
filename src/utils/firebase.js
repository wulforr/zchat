import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRkFUu1LTxaA1SRw1eT_qfBDKcEty_oDo",
  authDomain: "zchat-4ecf9.firebaseapp.com",
  databaseURL: "https://zchat-4ecf9.firebaseio.com",
  projectId: "zchat-4ecf9",
  storageBucket: "zchat-4ecf9.appspot.com",
  messagingSenderId: "379811329758",
  appId: "1:379811329758:web:fb184118b2afd51dfc344f",
  measurementId: "G-79Z0B5HCEK",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const addUser = (email, name) => {
  return db.collection("users").add({
    email: email,
    name: name,
    chats: [],
  });
};
