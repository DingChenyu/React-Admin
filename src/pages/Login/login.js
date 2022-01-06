import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { reqLogin } from "../../api/index";
import qs from "qs";
import "./login.css";
import storgeUtils from "../../utils/storgeUtils";
import { Redirect } from "react-router-dom";
export default class Login extends Component {
  // TODO:动态调整主题色
  // theme = () => {
  //   window.less.modifyVars({
  //     "@primary-color": "#000",
  //   });
  // };

  // 对表单进行检验
  onFinish = async (value) => {
    // 获取表单value值
    const { username, password } = value;
    console.log(username, password);
    let userInfo = { username, password };
    // 使后台可以接收到userInfo
    const params = qs.stringify(userInfo);
    // 异步请求——登录
    const response = await reqLogin(params);
    console.log("success!!", response);
    const user = response.data;
    if (response.status === 0) {
      message.success("登录成功^_^");
      // 全局存储数据 保存在local中
      storgeUtils.saveUser(user);
      // 跳转到管理页面(不需要再退回到登录页面)
      this.props.history.replace("/Admin");
    } else {
      message.error("登录失败");
    }
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
    // 判断用户是否登录
    const user = storgeUtils.getUser();
    console.log(user);
    // 如果有用户信息 跳转到admin页面
    if (user && user._id) {
      return <Redirect to="/Admin" />;
    }

    return (
      <div className="login">
        <header className="login-header">
          <img src={require("../../assets/images/logo.png")} alt="logo" />
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
