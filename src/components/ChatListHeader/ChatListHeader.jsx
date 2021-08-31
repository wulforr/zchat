import React from "react";
import "./ChatListHeader.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

import { signOut } from "../../utils/firebase";
import { useHistory } from "react-router";

export default function ChatListHeader({ chatListref }) {
  const history = useHistory();
  const handleSignOut = async () => {
    try {
      await signOut();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="chat-list-header">
      <div className="chat-list-header-profile">
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
      <button onClick={handleSignOut}>
        <IoLogOut />
      </button>
    </div>
  );
}
