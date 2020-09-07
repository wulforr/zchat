import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
// import "./Signup.css";
import * as firestoreService from "../../utils/firebase";

export default function Signup() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginBtnText, setLoginBtnText] = useState("Login");
  const [errorMsgText, setErrorMsgText] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = async () => {
    setLoginBtnText("Logging in");
    try {
      const res = await firestoreService.login(email, password);
      window.localStorage.setItem("loggedUser", JSON.stringify(res));
      history.push("/chats");
    } catch (err) {
      setErrorMsgText(err.message);
      setLoginBtnText("Login");
    }
  };

  return (
    <div className="signup-div">
      <div className="signup-container">
        <h1>Login</h1>
        <div className="signup-input-wrapper">
          <label>Email:</label>
          <input
            type="text"
            className="inputText"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="signup-input-wrapper">
          <label>Password:</label>
          <input
            type="text"
            className="inputText"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="btn signup-btn" onClick={handleLogin}>
          {loginBtnText}
        </button>
        <div className="signup-error-msg">{errorMsgText}</div>
        <div className="loginText">
          Already a user
          <Link to="/login" className="loginTextLink loginText">
            {" Login"}
          </Link>
        </div>
      </div>
    </div>
  );
}
