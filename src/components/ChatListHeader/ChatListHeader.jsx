import React from "react";
import "./ChatListHeader.css";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function ChatListHeader({ chatListref }) {
  return (
    <div className="chat-list-header">
      <div
        className="chat-list-header-back-btn"
        onClick={() => {
          chatListref.current.classList.remove("chat-list-show");
        }}
      >
        <IoMdArrowRoundBack />
      </div>
      <div className="chat-list-header-avatar">
        <img src="https://i.imgur.com/jA7j4Qx.jpg" alt="avatar" />
      </div>
      <div className="chat-list-header-name">Shaurya</div>
    </div>
  );
}
