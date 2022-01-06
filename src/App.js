import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Admin from "./pages/Admin/admin";
export default class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Admin} />
      </Switch>
    );
  }
}
