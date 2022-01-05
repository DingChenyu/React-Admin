import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import storgeUtils from "../../utils/storgeUtils";

export default class Admin extends Component {
  render() {
    // 获取用户信息
    const user = storgeUtils.getUser();
    console.log("userInfo!!", user);
    // 如果有用户没有用户id 跳转到login页面
    if (!user || !user._id) {
      return <Redirect to="/Login" />;
    }
    return <div>Admin</div>;
  }
}
