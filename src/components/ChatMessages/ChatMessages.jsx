import React, { useEffect, useRef } from "react";
import "./ChatMessages.css";

export default function ChatMessages({ currentChat }) {
  const ChatMessagesContainerRef = useRef(null);

  useEffect(() => {
    ChatMessagesContainerRef.current.scrollTop =
      ChatMessagesContainerRef.current.scrollHeight;
  }, [currentChat]);

  return currentChat ? (
    <div className="chat-messages-container" ref={ChatMessagesContainerRef}>
      {currentChat.messages.map((message) => (
        <div className="chat-message-wrapper" key={message.messageId}>
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
  ) : (
    <div>Loading...</div>
  );
}
