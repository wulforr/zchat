import React, { useEffect, useRef } from "react";
import "./ChatMessages.css";

export default function ChatMessages({ currentChat, currentUserId }) {
  const ChatMessagesContainerRef = useRef(null);

  // to scroll to the bottom of the chat so that most recent message is in view
  useEffect(() => {
    ChatMessagesContainerRef.current.scrollTop =
      ChatMessagesContainerRef.current.scrollHeight;
  }, [currentChat.messages]);

  return currentChat ? (
    <div className="chat-messages-container" ref={ChatMessagesContainerRef}>
      {currentChat.messages.map((message) => (
        <div className="chat-message-wrapper" key={message.messageId}>
          <div
            className={
              message.sender.id === currentUserId
                ? "chat-message-right"
                : "chat-message-left"
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
