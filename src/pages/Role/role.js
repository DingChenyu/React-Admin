import React, { Component } from "react";
import { Card, Button, Table, message, Modal, Form, Input } from "antd";
import { reqRoleList } from "../../api/index";
const { Item } = Form;

export default class Role extends Component {
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
      { title: "角色名称", dataIndex: "name" },
      {
        title: "创建时间",
        dataIndex: "create_time",
      },
      { title: "授权时间", dataIndex: "auth_time" },
      { title: "授权人", dataIndex: "auth_name" },
    ];
  };

  getRoleList = () => {
    reqRoleList()
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

  onRow = (role) => {
    return {
      onClick: (event) => {
        this.setState({ role });
      },
    };
  };

  addRole = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  componentDidMount() {
    // 初始化table的列表
    this.initColumns();
    // 获取角色列表数据
    this.getRoleList();
  }

  render() {
    const { roles, role, isLoading, isModalVisible } = this.state;
    const title = (
      <span>
        <Button
          type="primary"
          style={{ marginRight: 10 }}
          onClick={() => {
            this.setState({ isModalVisible: true });
          }}
        >
          创建角色
        </Button>
        <Button type="primary" disabled={!role._id}>
          设置角色权限
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
          rowSelection={{ type: "radio", selectedRowKeys: [role._id] }}
          onRow={this.onRow}
        />
        <Modal
          title="添加角色"
          visible={isModalVisible}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isModalVisible: false });
          }}
        >
          <Form wrapperCol={{ span: 15 }}>
            <Item
              label="角色名称"
              name="roleName"
              rules={[{ required: true, message: "角色名称必须输入" }]}
            >
              <Input placeholder="请输入角色名称" />
            </Item>
          </Form>
        </Modal>
      </Card>
    );
  }
}
