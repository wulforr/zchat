import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { currentUser, login } from "../../utils/firebase";
import "./Login.css";

export default function Login() {
  const history = useHistory();

  const [loginBtnText, setLoginBtnText] = useState("Login");
  const [errorMsgText, setErrorMsgText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      history.push("/watchers");
    }
  }, [history]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginBtnText("Logging in...");
    try {
      await login(email, password);
      history.push("/watchers");
    } catch (err) {
      setLoginBtnText("Login");
      setErrorMsgText("Username or Password is incorrect");
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <h1>Login</h1>
        <div className="formRow">
          <label>Email</label>
          <input
            type="email"
            onChange={handleEmailChange}
            value={email}
            className="inputText"
          />
        </div>

        <div className="formRow">
          <label>Password</label>
          <input
            type="password"
            onChange={handlePasswordChange}
            value={password}
            className="inputText"
          />
        </div>
        <button onClick={handleLogin} className="btn loginBtn">
          {loginBtnText}
        </button>
        <div className="loginErrorMsg">{errorMsgText}</div>
        <div className="loginText">
          Don't have an account?
          <Link to="/signup" className="signupTextLink">
            {" Register for free"}
          </Link>
        </div>
      </div>
    </div>
  );
}
