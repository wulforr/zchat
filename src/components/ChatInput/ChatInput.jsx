import React from "react";
import "./ChatInput.css";

export default function ChatInput({ value, addMsg, setInputValue }) {
  return (
    <div className="chat-input-wrapper">
      <input
        type="text"
        placeholder="Type a message"
        value={value}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            addMsg(value);
          }
        }}
      />
    </div>
  );
}
