import React from "react";
import "./ChatDetailsHeader.css";
import { getFormattedText } from "../../utils/utils";

export default function ChatDetailsHeader({ currentChat }) {
  return currentChat ? (
    <div className="chat-details-header-wrapper">
      <div className="chat-details-header-left">
        <div className="chat-details-header-name">{currentChat.name}</div>
        <div className="chat-details-header-status">
          {getFormattedText(currentChat.status, 70)}
        </div>
      </div>
      <div className="chat-details-header-right">
        <div className="chat-details-header-image">
          <img src={currentChat.image} alt="avatar" />
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
