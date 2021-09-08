import React from "react";
import "./AddChat.css";
import { BsFillPersonPlusFill } from "react-icons/bs";

export default function AddChat({ addChat }) {
  return (
    <div className="add-chat">
      <div
        className="add-chat-text"
        onClick={() => {
          let name = window.prompt("Enter the name of the person");
          // if it is cancelled it returns null so this will work only if name is entered
          if (name) {
            addChat(name);
          }
        }}
      >
        Add chat <BsFillPersonPlusFill />
      </div>
    </div>
  );
}
