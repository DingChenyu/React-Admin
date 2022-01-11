import React, { Component } from "react";
import { Card, Select, Input, Button, Table, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqProducts, reqSearchName, reqSearchType } from "../../api/index";
import { changeCountFun } from "../../redux/actions/countReducer";
import { connect } from "react-redux";
const { Option } = Select;

class ProductHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Products: [], //商品的数组
      isLoading: true,
      SearchName: "", //搜索的关键字
      SearchType: "ProductName", //根据哪个字段搜索
    };
  }

  // 初始化table的列表
  initColumns = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
      },
      {
        title: "价格",
        dataIndex: "name",
        render: (name) => "¥" + name,
      },
      {
        width: 100,
        title: "状态",
        dataIndex: "status",
        render: (status) => {
          return (
            <span>
              <Button type="primary">下架</Button>
              <span>在售</span>
            </span>
          );
        },
      },
      {
        width: 100,
        title: "操作",
        render: (product) => {
          return (
            <span>
              <Button
                onClick={() => {
                  this.props.history.push("/product/detail", { product });
                }}
                size="small"
                type="link"
              >
                详情
              </Button>
              <Button
                size="small"
                type="link"
                onClick={() => {
                  this.props.history.push("/product/addupdate");
                }}
              >
                修改
              </Button>
            </span>
          );
        },
      },
    ];
  };

  //获取商品数据
  getreqProducts = () => {
    reqProducts()
      .then((response) => {
        console.log(response.data.data.list);
        let result = response.data.data;
        if (result.list !== []) {
          this.setState({
            Products: result.list,
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

  componentDidMount() {
    console.log(this.props.count);
    //获取商品列表
    this.getreqProducts();
    //初始化列的数据
    this.initColumns();
    // test redux
    this.props
      .dispatch(changeCountFun())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 按照类型搜索关键字查找商品列表
  search = () => {
    let { SearchType, SearchName } = this.state;
    if (SearchType === "ProductName") {
      reqSearchName()
        .then((response) => {
          console.log("mc", response);
          let result = response.data.data.list;
          this.setState({ Products: result });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      reqSearchType()
        .then((response) => {
          console.log("ms", response);
          let result = response.data.data.list;
          this.setState({ Products: result });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // 如果input value为空进行搜索 将请求所有数据
    if (SearchName === "") {
      this.getreqProducts();
    }
  };
  render() {
    const { Products, isLoading, SearchName, SearchType } = this.state;
    const title = (
      <span>
        <Select
          defaultValue={SearchType}
          style={{ width: 150 }}
          onChange={(value) => {
            this.setState({ SearchType: value });
          }}
        >
          <Option value="ProductName">按名称搜索</Option>
          <Option value="ProductDesc">按描述搜索</Option>
        </Select>
        <Input
          style={{ width: 200, margin: "0 15px" }}
          placeholder="关键字"
          value={SearchName}
          onChange={(event) => {
            this.setState({ SearchName: event.target.value });
          }}
        />
        <Button type="primary" onClick={this.search}>
          搜索
        </Button>
      </span>
    );
    const extra = (
      <Button
        onClick={() => {
          this.props.history.push("/product/addupdate");
        }}
      >
        <PlusOutlined />
        添加商品
      </Button>
    );

    return (
      <Card
        title={title}
        extra={extra}
        style={{ width: "100%", overflow: "auto" }}
      >
        <Table
          dataSource={Products}
          columns={this.columns}
          bordered
          rowKey="_id"
          loading={isLoading}
          pagination={{
            defaultPageSize: 3,
            showQuickJumper: true,
            //指定特定的页码
            // current: this.page,
          }}
        />
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.itemState.count,
});

export default connect(mapStateToProps)(ProductHome);
