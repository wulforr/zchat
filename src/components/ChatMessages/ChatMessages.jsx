import React from "react";
import "./ChatMessages.css";

export default function ChatMessages({ data }) {
  console.log(data);
  return (
    <div className="chat-messages-container">
      {data.messages.map((message) => (
        <div className="chat-message-wrapper" key={message.id}>
          <div
            className={
              message.sender === "user1"
                ? "chat-message-left"
                : "chat-message-right"
            }
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
}
