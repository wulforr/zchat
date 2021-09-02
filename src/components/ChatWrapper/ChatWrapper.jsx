import React, { useState, useEffect, useRef } from "react";
import "./ChatWrapper.css";
import ChatItem from "../ChatItem/ChatItem";
import ChatListHeader from "../ChatListHeader/ChatListHeader";
import ChatSearchBar from "../ChatSearchBar/ChatSearchBar";
import ChatDetailsHeader from "../ChatDetailsHeader/ChatDetailsHeader";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatInput from "../ChatInput/ChatInput";
import { generateData } from "../../utils/fakedata";
import { addMessage } from "../../utils/utils";
import AddChat from "../AddChat/AddChat";
import { addChatUser } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import { auth, db } from "../../utils/firebase";
import { query, onSnapshot, where, collection, doc } from "firebase/firestore";

export default function ChatWrapper() {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const chatListref = useRef(null);
  const history = useHistory();

  // add some fake data
  useEffect(() => {
    console.log(`user`, auth.currentUser);
    if (auth.currentUser) {
      const chatsRef = collection(db, "chats");
      const q = query(
        chatsRef,
        where("participants", "array-contains", auth.currentUser.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let tempChats = [];
        querySnapshot.forEach((doc) => {
          tempChats.push({ id: doc.id, ...doc.data(), messages: [] });
        });
        console.log("tempChats", tempChats);
        tempChats.forEach((chat, index) => {
          onSnapshot(
            collection(db, "chats", chat.id, "messages"),
            (querySnapshot) => {
              querySnapshot.forEach((doc) => {
                tempChats[index].messages = [
                  ...tempChats[index].messages,
                  { id: doc.id, ...doc.data() },
                ];
              });
              console.log("chatsWithMessage", tempChats);
            }
          );
        });
      });
      return () => unsubscribe();
    } else {
      history.push("/login");
    }
  }, [history]);

  // filtering data according to search query and sorting it according to time so most recent chat will be shown at top
  useEffect(() => {
    if (data) {
      let tempFilteredData = data.filter((ele) =>
        new RegExp(searchQuery, "gi").test(ele.name)
      );

      let tempFilteredSortedData = tempFilteredData.sort((a, b) => {
        if (a.messages.length === 0) {
          return true;
        } else if (b.messages.length === 0) {
          return true;
        } else {
          return (
            new Date(b.messages.slice(-1)[0].time) -
            new Date(a.messages.slice(-1)[0].time)
          );
        }
      });
      setFilteredData(tempFilteredSortedData);
    }
  }, [searchQuery, data]);

  //adding message to the data and then updating state and current chat after adding message and clearing the input field
  const addMsg = (msg) => {
    const updatedData = addMessage(data, msg, currentChat.id);
    setData(updatedData);
    setCurrentChat(updatedData.filter((ele) => ele.id === currentChat.id)[0]);
    setInputValue("");
  };

  const addChat = (name) => {
    const updatedData = addChatUser(data, name);
    setData(updatedData);
  };

  return data && data.length ? (
    <div className="chat-container">
      <div
        className="chat-hamburger"
        onClick={() => {
          chatListref.current.classList.add("chat-list-show");
        }}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="chat-list" ref={chatListref}>
        <ChatListHeader chatListref={chatListref} />
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
            chatListref={chatListref}
          />
        ))}
      </div>
      <div className="chat-details">
        {currentChat ? (
          <>
            <ChatDetailsHeader currentChat={currentChat} />
            <ChatMessages currentChat={currentChat} />
            <ChatInput
              value={inputValue}
              setInputValue={setInputValue}
              addMsg={addMsg}
            />
          </>
        ) : (
          <div className="chat-initial-screen">
            <h1>Welcome, Shaurya</h1>
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
