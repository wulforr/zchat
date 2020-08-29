import React from "react";
import "./ChatInput.css";

export default function ChatInput({ value, onChange }) {
  return (
    <div className="chat-input-wrapper">
      <input
        type="text"
        placeholder="Type a message"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
