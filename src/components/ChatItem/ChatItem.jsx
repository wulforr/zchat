import React from "react";
import "./ChatItem.css";

export default function ChatItem() {
  return (
    <div className="chat-item-wrapper">
      <div className="chat-item-left">
        <div className="chat-item-avatar"></div>
      </div>
      <div className="chat-item-right">
        <div className="chat-item-name">name</div>
        <div className="chat-item-time">8:12 pm</div>
        <div className="chat-item-last-message">last message sent</div>
        {/* <div className="chat-item-unread">unread</div> */}
      </div>
    </div>
  );
}
