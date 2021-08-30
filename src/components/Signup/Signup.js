import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { signUp, addUser, currentUser } from "../../utils/firebase";
import "./Signup.css";

export default function Signup() {
  const history = useHistory();
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupBtnText, setSignupBtnText] = useState("Signup");
  const [errorMsgText, setErrorMsgText] = useState("");

  useEffect(() => {
    if (currentUser) {
      console.log(`User ${currentUser}`);
      history.push("/watchers");
    }
  }, [history]);
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
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
      await signUp(email, password);
      addUser(email, userName);
      history.push("/chats");
    } catch (err) {
      console.log("err is", err);
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
            className="input-text"
            value={userName}
            onChange={handleUserNameChange}
          />
        </div>
        <div className="signup-input-wrapper">
          <label>Email:</label>
          <input
            type="text"
            className="input-text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="signup-input-wrapper">
          <label>Password:</label>
          <input
            type="text"
            className="input-text"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="btn signup-btn" onClick={checkValidationAndSubmit}>
          {signupBtnText}
        </button>
        <div className="signup-error-msg">{errorMsgText}</div>
        <div className="login-text">
          Already a user
          <Link to="/login" className="login-text-link login-text">
            {" Login"}
          </Link>
        </div>
      </div>
    </div>
  );
}
