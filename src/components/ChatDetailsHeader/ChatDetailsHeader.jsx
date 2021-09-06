import React, { useState, useEffect } from "react";
import "./ChatDetailsHeader.css";
import { getImageUrl } from "../../utils/utils";
import { auth } from "../../utils/firebase";

export default function ChatDetailsHeader({ currentChat }) {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const getImage = async () => {
      const tempImageUrl = await getImageUrl(currentChat, auth.currentUser.uid);
      setImageUrl(tempImageUrl.avatar);
    };
    getImage();
  }, [currentChat]);
  console.log("current chat: ", currentChat);
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
