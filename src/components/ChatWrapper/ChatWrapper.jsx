import React, { useState } from "react";
import "./ChatWrapper.css";
import ChatItem from "../ChatItem/ChatItem";
import ChatListHeader from "../ChatListHeader/ChatListHeader";
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

  // add some fake data
  useEffect(() => {
    let tempData = generateData();
    setData(tempData);
  }, []);

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
        {data.map((ele) => (
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
          <div>Loading...</div>
        )}
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
