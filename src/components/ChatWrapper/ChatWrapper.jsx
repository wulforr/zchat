import React, { useState } from "react";
import "./ChatWrapper.css";
import ChatItem from "../ChatItem/ChatItem";
import ChatListHeader from "../ChatListHeader/ChatListHeader";
import ChatSearchBar from "../ChatSearchBar/ChatSearchBar";
import ChatDetailsHeader from "../ChatDetailsHeader/ChatDetailsHeader";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatInput from "../ChatInput/ChatInput";
import { generateData } from "../fakedata";
import { useEffect } from "react";
import { addMessage } from "../../utils/utils";

export default function ChatWrapper() {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  // add some fake data
  useEffect(() => {
    let tempData = generateData();
    setData(tempData);
    setFilteredData(tempData);
  }, []);

  console.log(filteredData);

  useEffect(() => {
    if (data) {
      let tempFilteredData = data.filter((ele) =>
        new RegExp(searchQuery, "gi").test(ele.name)
      );

      tempFilteredData = tempFilteredData.sort(
        (a, b) =>
          new Date(b.messages.slice(-1)[0].time) -
          new Date(a.messages.slice(-1)[0].time)
      );
      setFilteredData(tempFilteredData);
    }
  }, [searchQuery, data]);

  const addMsg = (msg) => {
    const updatedData = addMessage(data, msg, currentChat.id);
    //updating data and current chat after adding message and clearing the input field
    setData(updatedData);
    setCurrentChat(updatedData.filter((ele) => ele.id === currentChat.id)[0]);
    setInputValue("");
  };

  return data && data.length ? (
    <div className="chat-container">
      <div className="chat-list">
        <ChatListHeader />
        <ChatSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {filteredData.map((ele) => (
          <ChatItem key={ele.id} data={ele} setCurrentChat={setCurrentChat} />
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
    <div>Loading</div>
  );
}
