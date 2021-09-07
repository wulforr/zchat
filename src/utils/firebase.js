import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  setDoc,
  doc,
} from "firebase/firestore";
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
  console.log("signing up");
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const addUser = (email, userName, uid) => {
  return setDoc(doc(db, "users", uid), {
    email,
    userName,
    avatar: `https://avatars.dicebear.com/api/gridy/${email}.svg`,
  });
};

export const signOut = () => {
  return auth.signOut();
};

const getDocsFromUserName = async (userName) => {
  const q = query(collection(db, "users"), where("userName", "==", userName));
  const docs = await getDocs(q);
  const docsWithSameUserName = [];
  docs.forEach((doc) => {
    docsWithSameUserName.push({ id: doc.id, data: doc.data() });
  });
  return docsWithSameUserName;
};

export const isUserNameUnique = async (userName) => {
  const users = await getDocsFromUserName(userName);
  console.log("docs oin ", users);
  return users.length ? false : true;
};

export const addNewChat = async (data, userName, currentUserId) => {
  const users = await getDocsFromUserName(userName);
  if (users) {
    const userId = users[0].id;
    return addDoc(collection(db, "chats"), {
      participants: [currentUserId, userId],
      name: userName,
      type: "chat",
    });
  } else {
    throw new Error("No user with this userName found");
  }
};

export const addMessage = async (message, senderId, chatId) => {
  return addDoc(collection(db, "chats", chatId, "messages"), {
    text: message,
    time: Timestamp.now(),
    sender: {
      id: senderId,
    },
  });
};
