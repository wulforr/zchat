import React, { useState } from "react";
import "./ChatWrapper.css";
import ChatItem from "../ChatItem/ChatItem";
import ChatListHeader from "../ChatListHeader/ChatListHeader";
import ChatDetailsHeader from "../ChatDetailsHeader/ChatDetailsHeader";
import data from "../messages.json";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatInput from "../ChatInput/ChatInput";

export default function ChatWrapper() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="chat-container">
      <div className="chat-list">
        <ChatListHeader />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </div>
      <div className="chat-details">
        <ChatDetailsHeader />
        <ChatMessages data={data} />
        <ChatInput
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
