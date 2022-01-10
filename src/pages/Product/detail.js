import React, { Component } from "react";
import { Button, Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
// 将list中的item取出来定义
const Item = List.Item;

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.location.state);
  }
  render() {
    // 拿到上个页面（home）传来的数据
    const { name, desc, price, detail } = this.props.location.state.product;
    const title = (
      <span>
        <ArrowLeftOutlined
          onClick={() => {
            this.props.history.goBack();
          }}
        />
        <span style={{ marginLeft: "10px" }}>商品详情</span>
      </span>
    );

    return (
      <Card title={title} style={{ width: "100%" }} className="product-detail">
        {/* <List
          size="large"
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        /> */}
        <List>
          <Item>
            <span className="left">
              商品名称：<span className="left-txt">{name}</span>
            </span>
          </Item>
          <Item>
            <span className="left">
              商品描述：
              <span className="left-txt">{desc}</span>
            </span>
          </Item>
          <Item>
            <span className="left">
              商品价格：<span className="left-txt">{price}元</span>
            </span>
          </Item>
          <Item>
            <span className="left">
              商品图片：
              <span>
                <img
                  className="product-img"
                  src="https://img10.360buyimg.com/n1/s450x450_jfs/t1/171130/32/25629/87434/61a58828Eeea46c15/353a556d47c25121.jpg"
                  alt="img"
                />
                <img
                  className="product-img"
                  src="https://img10.360buyimg.com/n1/s450x450_jfs/t1/159807/4/21607/90330/61a58828Edc755585/29e0f2054abe2af4.jpg"
                  alt="img"
                />
              </span>
            </span>
          </Item>
          <Item>
            <span className="left">
              商品详情：
              <span dangerouslySetInnerHTML={{ __html: detail }}></span>
            </span>
          </Item>
        </List>
      </Card>
    );
  }
}
