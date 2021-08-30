import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";
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
const db = getFirestore(app);
export const auth = getAuth();

export const signUp = async (email, password, userName) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await addUser(email, userName);
  } catch (err) {
    return err;
  }
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    return err;
  }
};

const addUser = (email, userName) => {
  return addDoc(collection(db, "users"), {
    email,
    userName,
  });
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (err) {
    return err;
  }
};
