import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Signup.css";
import * as firestoreService from "../../utils/firebase";

export default function Signup() {
  const history = useHistory();
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupBtnText, setSignupBtnText] = useState("Signup");
  const [errorMsgText, setErrorMsgText] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };

  const checkValidationAndSubmit = () => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (password.length < 8) {
      return setErrorMsgText(
        "Password must be greater than or equal to 8 characters"
      );
    } else if (!emailRegex.test(String(email).toLowerCase())) {
      return setErrorMsgText("Email address must be valid");
    } else {
      handleSignup();
    }
  };

  const handleSignup = async () => {
    setSignupBtnText("Signing up");
    try {
      const res = await firestoreService.signUp(email, password);
      console.log(res);
      await firestoreService.addUser(email, userName);
      history.push("/chats");
    } catch (err) {
      setErrorMsgText(err.message);
      setSignupBtnText("Signup");
    }
  };

  return (
    <div className="signup-div">
      <div className="signup-container">
        <h1>Signup</h1>
        <div className="signup-input-wrapper">
          <label>Username:</label>
          <input
            type="text"
            className="inputText"
            value={userName}
            onChange={handleUserNameChange}
          />
        </div>
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
        <button className="btn signup-btn" onClick={checkValidationAndSubmit}>
          {signupBtnText}
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
