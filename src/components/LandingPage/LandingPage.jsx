import React from "react";
import "./LandingPage.css";
import { useHistory } from "react-router-dom";

export default function LandingPage() {
  const history = useHistory();
  return (
    <section className="landing-page-wrapper">
      <div className="landing-page-container">
        <h1>Welcome to Zchat</h1>
        <p>A chat application to stay in touch with your loved ones</p>
        <button onClick={() => history.push("/chat")}>Get started</button>
      </div>
    </section>
  );
}
