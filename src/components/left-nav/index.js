import React, { Component } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import "./index.css";

class LeftNav extends Component {
  render() {
    const { SubMenu } = Menu;

    // 获取当前请求的路由路径
    const path = this.props.location.pathname;
    console.log(path);

    // 防止刷新页面使默认选中项消失
    let isListOpen;
    if (path === "/Category" || path === "/Product") {
      isListOpen = "sub1";
    } else if (path == "/Bar" || path === "/Line" || path === "/Pie") {
      isListOpen = "sub2";
    }
    return (
      <div className="left-nav">
        <Link to="/">
          <header className="left-nav-header">
            <img src={require("../../assets/images/logo.png")} alt="logo" />
            <h2>React后台</h2>
          </header>
        </Link>
        {/* Menu */}
        <div style={{ width: "100%" }}>
          <Menu
            selectedKeys={[path]}
            defaultOpenKeys={[isListOpen]}
            mode="inline"
            theme="dark"
          >
            <Menu.Item key="/Home" icon={<PieChartOutlined />}>
              <Link to="/Home">首页</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
              <Menu.Item key="/Category" icon={<PieChartOutlined />}>
                <Link to="/Category">品类管理</Link>
              </Menu.Item>
              <Menu.Item key="/Product" icon={<PieChartOutlined />}>
                <Link to="/Product">商品管理</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="/User" icon={<PieChartOutlined />}>
              <Link to="/User">用户管理</Link>
            </Menu.Item>
            <Menu.Item key="/Role" icon={<PieChartOutlined />}>
              <Link to="/Role">角色管理</Link>
            </Menu.Item>
            <SubMenu key="sub2" icon={<MailOutlined />} title="图形图表">
              <Menu.Item key="/Bar" icon={<PieChartOutlined />}>
                <Link to="/Bar">柱形图</Link>
              </Menu.Item>
              <Menu.Item key="/Line" icon={<PieChartOutlined />}>
                <Link to="/Line">折线图</Link>
              </Menu.Item>
              <Menu.Item key="/Pie" icon={<PieChartOutlined />}>
                <Link to="/Pie">饼图</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    );
  }
}

// 将非路由组件改成路由组件，即可使用this.props.location.pathname
export default withRouter(LeftNav);
