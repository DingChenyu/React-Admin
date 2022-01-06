import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import storgeUtils from "../../utils/storgeUtils";
import Header from "../../components/header";
import LeftNav from "../../components/left-nav/index";
import Home from "../Home/home";
import Category from "../Category/category";
import Product from "../Product/product";
import Role from "../Role/role";
import User from "../User/user";
import Bar from "../Charts/bar";
import Line from "../Charts/line";
import Pie from "../Charts/pie";

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    // 获取用户信息
    const user = storgeUtils.getUser();
    console.log("userInfo!!", user);
    // 如果有用户没有用户id 跳转到login页面
    if (!user || !user._id) {
      return <Redirect to="/Login" />;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ backgroundColor: "#fff" }}>
            <Switch>
              <Route exact path="/Home" component={Home} />
              <Route path="/Category" component={Category} />
              <Route path="/Product" component={Product} />
              <Route path="/Role" component={Role} />
              <Route path="/User" component={User} />
              <Route path="/Line" component={Line} />
              <Route path="/Bar" component={Bar} />
              <Route path="/Pie" component={Pie} />
              <Redirect to="/Home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#aaa" }}>
            推荐使用谷歌浏览器， 可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
