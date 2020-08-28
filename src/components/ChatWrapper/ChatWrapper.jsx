import React from "react";
import "./ChatWrapper.css";
import ChatItem from "../ChatItem/ChatItem";
import ChatListHeader from "../ChatListHeader/ChatListHeader";

export default function ChatWrapper() {
  return (
    <div className="chat-container">
      <div className="chat-list">
        <ChatListHeader />
        <ChatItem />
      </div>
      <div className="chat-details"></div>
    </div>
  );
}
