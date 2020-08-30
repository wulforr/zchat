import React from "react";
import "./ChatSearchBar.css";

export default function ChatSearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="searchbar-wrapper">
      <input
        type="text"
        placeholder="Search"
        className="searchbar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
