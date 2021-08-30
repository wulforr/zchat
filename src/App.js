import React from "react";
import ChatWrapper from "./components/ChatWrapper/ChatWrapper";
import "./App.css";
import Login from "./components/Login/Login";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ChatWrapper />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
