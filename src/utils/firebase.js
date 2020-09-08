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

let currentUser = null;
console.log(currentUser);

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

firebase.auth().onAuthStateChanged((user) => {
  currentUser = user;
});

export const authWatcher = () => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      return user;
    }
  });
};

export const addUser = (email, name) => {
  return db.collection("users").add({
    email: email,
    name: name,
    chats: [],
  });
};

export const addChat = async (username) => {
  const userToChat = await db
    .collection("users")
    .where("name", "==", username)
    .get();
  const userMail = firebase.auth().currentUser.email;
  const currentUser = await db
    .collection("users")
    .where("email", "==", userMail)
    .get();
  console.log(
    userToChat.docs,
    currentUser.docs,
    firebase.auth().currentUser.email
  );
  return db.collection("chats").add({
    users: [currentUser.docs[0].ref, userToChat.docs[0].ref],
    lastMessageTime: new Date(),
  });
};

export const getChats = async () => {
  console.log(currentUser);
  const currentUserMail = firebase.auth().currentUser.email;
  const currentUserChats = await db
    .collection("users")
    .where("email", "==", currentUserMail)
    // .orderBy("lastMessageTime")
    .onSnapshot((querySnapshot) => {
      console.log(querySnapshot.docs[0].data());
      return querySnapshot.docs[0].data();
    });
  return currentUserChats;
};
