import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
const axios = require("axios");

export default class Login extends Component {
  // TODO:动态调整主题色
  // theme = () => {
  //   window.less.modifyVars({
  //     "@primary-color": "#000",
  //   });
  // };

  onFinish = (value) => {
    console.log(value);
    const { username, password } = value;
    console.log(username, password);
    axios
      .get("http://127.0.0.1:3000/server")
      .then((res) => console.log(res.data))
      .then((err) => console.log(err));
  };

  // TODO: validator验证password
  // validatePwd = (rule, value, callback) => {
  //   if (!value) {
  //     callback("密码必须输入");
  //   } else if (value.length < 4) {
  //     callback("密码长度不能小于4位");
  //   } else if (value.length > 12) {
  //     callback("密码长度不能大于12位");
  //   } else if (!/^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/.test(value)) {
  //     callback("密码最少6位，包括至少1个小写字母，1个数字");
  //   }
  // };

  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={require("./images/logo.png")} alt="logo" />
          <span>React项目:后台管理系统</span>
        </header>
        <section className="login-content">
          <span>用户登录</span>
          {/* TODO:主题色切换 */}
          {/* <h6 onClick={this.theme}>主题色切换</h6> */}
          <div className="login-form">
            <Form
              name="normal_login"
              className="login-form"
              onFinish={this.onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "用户名必须输入",
                  },
                  {
                    min: 4,
                    message: "用户名至少4位",
                  },
                  {
                    max: 12,
                    message: "用户名最多12位",
                  },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "用户名必须是英文、数字或下划线组成",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="请输入用户名"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  // TODO: validator验证
                  // {
                  //   validator: this.validatePwd,
                  // },
                  {
                    required: true,
                    whitespace: true,
                    message: "密码必须输入",
                  },
                  {
                    min: 4,
                    message: "密码至少4位",
                  },
                  {
                    max: 12,
                    message: "密码最多12位",
                  },
                  {
                    pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/,
                    message: "密码最少6位，包括至少1个小写字母，1个数字",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="请输入密码"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
                <a href="/">注册</a>
              </Form.Item>
            </Form>
          </div>
        </section>
      </div>
    );
  }
}
