import React from "react";
import "./ChatItem.css";
import { getFormattedText, getTime } from "../../utils/utils";

export default function ChatItem({ data, setCurrentChat }) {
  return (
    <div className="chat-item-wrapper" onClick={() => setCurrentChat(data)}>
      <div className="chat-item-left">
        <div className="chat-item-avatar">
          <img src={data.image} alt="avatar" />
        </div>
      </div>
      <div className="chat-item-right">
        <div className="chat-item-name">{data.name}</div>
        <div className="chat-item-time">{getTime(data)}</div>
        <div className="chat-item-last-message">
          {getFormattedText(data.messages.slice(-1)[0].text, 25)}
        </div>
        {/* <div className="chat-item-unread">unread</div> */}
      </div>
    </div>
  );
}
