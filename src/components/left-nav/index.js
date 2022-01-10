import React, { Component } from "react";
import { Menu } from "antd";
import { PieChartOutlined, MailOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import "./index.css";

class LeftNav extends Component {
  render() {
    const { SubMenu } = Menu;

    // 获取当前请求的路由路径
    const path = this.props.location.pathname;
    console.log(path);

    // 防止刷新页面使默认选中项消失
    let isListOpen, productPath;
    if (
      path === "/category" ||
      path === "/product" ||
      path === "/product/addupdate" ||
      path === "/product/detail"
    ) {
      isListOpen = "sub1";
    } else if (path === "/bar" || path === "/line" || path === "/pie") {
      isListOpen = "sub2";
    }
    if (
      path === "/product" ||
      path === "/product/addupdate" ||
      path === "/product/detail"
    ) {
      productPath = path;
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
            <Menu.Item key="/home" icon={<PieChartOutlined />}>
              <Link to="/home">首页</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
              <Menu.Item key="/category" icon={<PieChartOutlined />}>
                <Link to="/category">品类管理</Link>
              </Menu.Item>
              <Menu.Item key={productPath} icon={<PieChartOutlined />}>
                <Link to="/product">商品管理</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="/user" icon={<PieChartOutlined />}>
              <Link to="/user">用户管理</Link>
            </Menu.Item>
            <Menu.Item key="/role" icon={<PieChartOutlined />}>
              <Link to="/role">角色管理</Link>
            </Menu.Item>
            <SubMenu key="sub2" icon={<MailOutlined />} title="图形图表">
              <Menu.Item key="/bar" icon={<PieChartOutlined />}>
                <Link to="/bar">柱形图</Link>
              </Menu.Item>
              <Menu.Item key="/line" icon={<PieChartOutlined />}>
                <Link to="/line">折线图</Link>
              </Menu.Item>
              <Menu.Item key="/pie" icon={<PieChartOutlined />}>
                <Link to="/pie">饼状图</Link>
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
