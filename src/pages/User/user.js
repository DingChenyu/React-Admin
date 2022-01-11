import React, { Component } from "react";
import { Card, Button, Table } from "antd";

export default class User extends Component {
  render() {
    const title = (
      <span>
        <Button type="primary" style={{ marginRight: 10 }}>
          创建角色
        </Button>
        <Button type="primary">设置角色权限</Button>
      </span>
    );
    return <Card title={title}></Card>;
  }
}
