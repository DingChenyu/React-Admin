import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import ProductHome from "./home";
import AddUpdate from "./addUpdate";
import Detail from "./detail";
import "./product.css";

export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/product" component={ProductHome} />
        <Route path="/product/addupdate" component={AddUpdate} />
        <Route path="/product/detail" component={Detail} />
        <Redirect to="/product" />
      </Switch>
    );
  }
}
