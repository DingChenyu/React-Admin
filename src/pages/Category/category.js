import React, { Component } from "react";
import { Button, Card, Table, message } from "antd";
import "./category.css";
import { PlusOutlined } from "@ant-design/icons";
import {
  reqCategorys,
  reqAddCategory,
  reqUpdateCategory,
} from "../../api/index";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, //是否获取数据中
      categorys: [], //一级分类列表
      subCategorys: [], //二级分类列表
      parentId: "0", //当前需要显示分类列表的父分类ID
      parentName: "", //当前需要显示分类列表的父分类名称
    };
  }

  // 初始化table的列表
  initColumns = () => {
    this.columns = [
      {
        title: "分类的名称",
        dataIndex: "name",
      },
      {
        title: "操作",
        width: 300,
        // 返回需要显示的页面标签
        render: (category) => (
          <span>
            <Button size="small" type="link">
              修改分类
            </Button>
            <Button
              onClick={() => {
                this.showSubCategorys(category);
              }}
              size="small"
              type="link"
            >
              查看子分类
            </Button>
          </span>
        ),
      },
    ];
  };

  // 获取一级分类列表数据
  getCategorys = () => {
    const { parentId } = this.state;
    reqCategorys(parentId)
      .then((response) => {
        console.log(response.data.data.data);
        let result = response.data.data;
        if (result.status === 0) {
          this.setState({
            categorys: result.data,
            isLoading: false,
          });
        } else {
          message.error("获取分类列表失败");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 显示指定一级分类对象的二级列表
  showSubCategorys = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name,
    });
    console.log(category.name, category._id);
  };

  componentDidMount() {
    // 初始化table的列表
    this.initColumns();
    // 获取一级分类列表数据
    this.getCategorys();
  }

  render() {
    const { categorys, isLoading } = this.state;
    const title = "一级分类列表";
    const extra = (
      <Button type="primary">
        <PlusOutlined />
        添加
      </Button>
    );

    return (
      <Card title={title} extra={extra} style={{ width: "100%" }}>
        <Table
          dataSource={categorys}
          columns={this.columns}
          bordered
          rowKey="_id"
          loading={isLoading}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
      </Card>
    );
  }
}
