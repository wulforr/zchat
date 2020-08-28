import React from "react";
import "./ChatWrapper.css";
import ChatItem from "../ChatItem/ChatItem";
import ChatListHeader from "../ChatListHeader/ChatListHeader";
import ChatDetailsHeader from "../ChatDetailsHeader/ChatDetailsHeader";
import data from "../messages.json";
import ChatMessages from "../ChatMessages/ChatMessages";

export default function ChatWrapper() {
  return (
    <div className="chat-container">
      <div className="chat-list">
        <ChatListHeader />
        <ChatItem />
        <ChatItem />
      </div>
      <div className="chat-details">
        <ChatDetailsHeader />
        <ChatMessages data={data} />
      </div>
    </div>
  );
}
