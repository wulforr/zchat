import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const addUser = (email, userName) => {
  return addDoc(collection(db, "users"), {
    email,
    userName,
    avatar: `https://avatars.dicebear.com/api/gridy/${email}.svg`,
  });
};

export const signOut = () => {
  return auth.signOut();
};
