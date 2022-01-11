import React, { Component } from "react";
import { Card, Button, Table, message } from "antd";
import { reqUsersList } from "../../api/index";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      role: {}, //选中的role
      isLoading: true,
      isModalVisible: false, //是否显示添加页面
    };
  }

  // 初始化table的列表
  initColumns = () => {
    this.columns = [
      { title: "用户名", dataIndex: "username" },
      {
        title: "邮箱",
        dataIndex: "email",
      },
      { title: "电话", dataIndex: "phone" },
      { title: "注册时间", dataIndex: "create_time" },
      {
        title: "操作",
        render: (user) => (
          <span>
            <Button size="small" type="link">
              修改
            </Button>
            <Button size="small" type="link">
              删除
            </Button>
          </span>
        ),
      },
    ];
  };

  getRoleList = () => {
    reqUsersList()
      .then((response) => {
        console.log(response.data.data);
        let result = response.data.data;
        if (response.data.status === 0) {
          this.setState({
            roles: result,
            isLoading: false,
          });
        } else {
          message.error("获取角色列表失败");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    // 初始化table的列表
    this.initColumns();
    // 获取角色列表数据
    this.getRoleList();
  }
  render() {
    const { roles, isLoading } = this.state;
    const title = (
      <span>
        <Button type="primary" style={{ marginRight: 10 }}>
          创建用户
        </Button>
      </span>
    );
    return (
      <Card title={title}>
        <Table
          dataSource={roles}
          columns={this.columns}
          bordered
          rowKey="_id"
          loading={isLoading}
          pagination={{ defaultPageSize: 3, showQuickJumper: true }}
        />
      </Card>
    );
  }
}
