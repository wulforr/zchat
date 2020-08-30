import React from "react";
import "./ChatListHeader.css";

export default function ChatListHeader() {
  return (
    <div className="chat-list-header">
      <div className="chat-list-header-avatar">
        <img src="https://i.imgur.com/jA7j4Qx.jpg" alt="avatar" />
      </div>
      <div className="chat-list-header-name">Shaurya</div>
    </div>
  );
}
