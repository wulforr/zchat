import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import LandingPage from "./components/LandingPage/LandingPage";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/chat" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
