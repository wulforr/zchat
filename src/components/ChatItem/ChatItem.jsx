import React, { useState, useEffect } from "react";
import "./ChatItem.css";
import { getFormattedText, getTime, getImageUrl } from "../../utils/utils";

export default function ChatItem({
  data,
  setCurrentChat,
  chatListRef,
  currentUserId,
}) {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const getImage = async () => {
      const tempImageUrl = await getImageUrl(data, currentUserId);
      setImageUrl(tempImageUrl.avatar);
    };
    getImage();
  }, [data, currentUserId]);
  return (
    <div
      className="chat-item-wrapper"
      onClick={() => {
        setCurrentChat(data);
        chatListRef.current.classList.remove("chat-list-show");
      }}
    >
      <div className="chat-item-left">
        <div className="chat-item-avatar">
          <img src={imageUrl} alt="avatar" />
        </div>
      </div>
      <div className="chat-item-right">
        <div className="chat-item-name">{data.name}</div>
        <div className="chat-item-time">{getTime(data)}</div>
        <div className="chat-item-last-message">
          {data.messages.length
            ? getFormattedText(data.messages.slice(-1)[0].text, 25)
            : ""}
        </div>
      </div>
    </div>
  );
}
