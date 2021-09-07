import React, { useState, useEffect } from "react";
import "./ChatDetailsHeader.css";
import { getImageUrl } from "../../utils/utils";

export default function ChatDetailsHeader({ currentChat, currentUserId }) {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const getImage = async () => {
      const tempImageUrl = await getImageUrl(currentChat, currentUserId);
      setImageUrl(tempImageUrl.avatar);
    };
    getImage();
  }, [currentChat, currentUserId]);
  return currentChat ? (
    <div className="chat-details-header-wrapper">
      <div className="chat-details-header-left">
        <div className="chat-details-header-name">{currentChat.name}</div>
        {/* <div className="chat-details-header-status">
          {getFormattedText(currentChat.status, 70)}
        </div> */}
      </div>
      <div className="chat-details-header-right">
        <div className="chat-details-header-image">
          <img src={imageUrl} alt="avatar" />
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
