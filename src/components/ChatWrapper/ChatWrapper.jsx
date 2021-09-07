import React, { useState, useEffect, useRef } from "react";
import "./ChatWrapper.css";
import ChatItem from "../ChatItem/ChatItem";
import ChatListHeader from "../ChatListHeader/ChatListHeader";
import ChatSearchBar from "../ChatSearchBar/ChatSearchBar";
import ChatDetailsHeader from "../ChatDetailsHeader/ChatDetailsHeader";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatInput from "../ChatInput/ChatInput";
import AddChat from "../AddChat/AddChat";
import { useHistory } from "react-router-dom";
import { db, addNewChat, addMessage } from "../../utils/firebase";
import {
  query,
  onSnapshot,
  where,
  collection,
  orderBy,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ChatWrapper() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const chatListRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        history.push("/login");
      }
    });
  }, [history]);

  // add some fake data
  useEffect(() => {
    if (user) {
      const chatsRef = collection(db, "chats");
      const q = query(
        chatsRef,
        where("participants", "array-contains", user.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let tempChats = [];
        querySnapshot.forEach((doc) => {
          tempChats.push({ id: doc.id, ...doc.data(), messages: [] });
        });
        tempChats.forEach((chat, index) => {
          onSnapshot(
            query(
              collection(db, "chats", chat.id, "messages"),
              orderBy("time")
            ),
            (querySnapshot) => {
              let messages = [];
              querySnapshot.forEach((doc) => {
                messages.push({
                  messageId: doc.id,
                  ...doc.data(),
                });
                tempChats[index].messages = messages;
              });
              setFilteredData(tempChats);
              setData(tempChats);
            }
          );
        });
        setFilteredData(tempChats);
        setData(tempChats);
      });
      return () => unsubscribe();
    }
  }, [user]);

  // filtering data according to search query and sorting it according to time so most recent chat will be shown at top
  useEffect(() => {
    if (data) {
      let tempFilteredData = data.filter((ele) =>
        new RegExp(searchQuery, "gi").test(ele.name)
      );

      // let tempFilteredSortedData = tempFilteredData.sort((a, b) => {
      //   if (a.messages.length === 0) {
      //     return true;
      //   } else if (b.messages.length === 0) {
      //     return true;
      //   } else {
      //     console.log("sorting", a.messages, a.messages.slice(-1)[0]);
      //     return (
      //       new Date(b.messages.slice(-1)[0].time) -
      //       new Date(a.messages.slice(-1)[0].time)
      //     );
      //   }
      // });
      setFilteredData(tempFilteredData);
    }
  }, [searchQuery, data]);

  //adding message to the data and then updating state and current chat after adding message and clearing the input field
  const addMsg = async (msg) => {
    try {
      await addMessage(msg, user.uid, currentChat.id);
      setInputValue("");
    } catch (err) {
      console.log("err", err);
    }
  };

  const addChat = async (userName) => {
    try {
      addNewChat(data, userName, user.uid);
    } catch (err) {
      console.log("err");
    }
    // setData(updatedData);
  };

  return data ? (
    <div className="chat-container">
      <div
        className="chat-hamburger"
        onClick={() => {
          chatListRef.current.classList.add("chat-list-show");
        }}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="chat-list" ref={chatListRef}>
        <ChatListHeader chatListRef={chatListRef} />
        <ChatSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <AddChat addChat={addChat} />
        {filteredData.map((ele) => (
          <ChatItem
            key={ele.id}
            data={ele}
            setCurrentChat={setCurrentChat}
            chatListRef={chatListRef}
            currentUserId={user.uid}
          />
        ))}
      </div>
      <div className="chat-details">
        {currentChat ? (
          <>
            <ChatDetailsHeader
              currentChat={currentChat}
              currentUserId={user.uid}
            />
            <ChatMessages currentChat={currentChat} currentUserId={user.uid} />
            <ChatInput
              value={inputValue}
              setInputValue={setInputValue}
              addMsg={addMsg}
            />
          </>
        ) : (
          <div className="chat-initial-screen">
            <h1>Welcome, {user.userName}</h1>
            <div className="chat-initial-image-wrapper">
              <img src="https://i.imgur.com/jA7j4Qx.jpg" alt="avatar" />
            </div>
            <div className="chat-initial-screen-text">
              Search for someone or click on any chat to start chatting
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>Please wait while we gather the data</div>
  );
}
