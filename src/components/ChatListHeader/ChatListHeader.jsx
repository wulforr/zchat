import React from "react";
import "./ChatListHeader.css";

export default function ChatListHeader() {
  return (
    <div className="chat-list-header">
      <div className="chat-list-header-avatar">
        <img
          src="https://s3.amazonaws.com/uifaces/faces/twitter/kevka/128.jpg"
          alt="avatar"
        />
      </div>
      <div className="chat-list-header-name">Wulfor</div>
    </div>
  );
}
