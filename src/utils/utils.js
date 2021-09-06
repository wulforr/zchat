import faker from "faker";
import { db } from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";

//if text length is greater than max length return trimmed text
export const getFormattedText = (text, maxLength) => {
  if (text.length > maxLength) {
    text = text.slice(1, maxLength);
    text += "...";
  }

  return text;
};

// return time of the last message
//the time is formated in such a way that if difference between current and last message date
// is greater than 6 days it will show date else it will show day and if date is same then it will show time
export const getTime = (data) => {
  if (data.messages.length === 0) {
    return "";
  }
  const lastMessageTime = data.messages.slice(-1)[0].time;
  const lastMessageDate = lastMessageTime.toDate();
  const currentDate = new Date();

  if (currentDate.getFullYear() - lastMessageDate.getFullYear() > 0) {
    return lastMessageDate.toLocaleDateString(["en-GB"]);
  } else if (currentDate.getMonth() - lastMessageDate.getMonth() > 0) {
    return lastMessageDate.toLocaleDateString(["en-GB"]);
  } else if (currentDate.getDate() - lastMessageDate.getDate() > 6) {
    return lastMessageDate.toLocaleDateString(["en-GB"]);
  } else if (currentDate.getDate() - lastMessageDate.getDate() > 0) {
    return lastMessageDate.toLocaleDateString(["en-GB"], {
      weekday: "long",
    });
  }

  const time = lastMessageDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
};

export const getImageUrl = async (data, currentUserId) => {
  console.log("currentUserId", currentUserId);
  const userId = data.participants.filter((id) => id !== currentUserId)[0];
  console.log("userId is", userId, data);
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  const result = docSnap.data();
  console.log("result is ", result);
  return result;
};
