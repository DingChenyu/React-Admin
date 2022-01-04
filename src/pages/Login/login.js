import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";

export default class Login extends Component {
  onFinish = (value) => {
    console.log("Received values of form: ", value);
  };
  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={require("./images/logo.png")} alt="logo" />
          <span>react项目:后台管理系统</span>
        </header>
        <section className="login-content">
          <span>用户登录</span>
          <div className="login-form">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名！",
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
                  {
                    required: true,
                    message: "请输入密码！",
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
