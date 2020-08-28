import React from "react";
import "./ChatDetailsHeader.css";

export default function ChatDetailsHeader() {
  return (
    <div className="chat-details-header-wrapper">
      <div className="chat-details-header-left">
        <div className="chat-details-header-name">Shaurya Vardhan</div>
        <div className="chat-details-header-status">
          A professional Developer in making
        </div>
      </div>
      <div className="chat-details-header-right">
        <div className="chat-details-header-image">
          <img
            src="https://s3.amazonaws.com/uifaces/faces/twitter/anatolinicolae/128.jpg"
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
}
