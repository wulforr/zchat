import React from "react";
import "./ChatItem.css";

export default function ChatItem() {
  return (
    <div className="chat-item-wrapper">
      <div className="chat-item-left">
        <div className="chat-item-avatar">
          <img
            src="https://s3.amazonaws.com/uifaces/faces/twitter/anatolinicolae/128.jpg"
            alt="avatar"
          />
        </div>
      </div>
      <div className="chat-item-right">
        <div className="chat-item-name">Shaurya Vardhan</div>
        <div className="chat-item-time">8:12 pm</div>
        <div className="chat-item-last-message">last message sent</div>
        {/* <div className="chat-item-unread">unread</div> */}
      </div>
    </div>
  );
}
