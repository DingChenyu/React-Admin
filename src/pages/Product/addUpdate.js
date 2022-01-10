import React, { Component } from "react";
import { Card, Form, Input, Cascader, Upload, message, Button } from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
const { Item } = Form;
const { TextArea } = Input;

// 上传图片
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

// 二级选择
const options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    isLeaf: false,
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    isLeaf: false,
  },
];

export default class AddUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options,
      loading: false,
    };
  }

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    const title = (
      <span>
        <ArrowLeftOutlined
          onClick={() => {
            this.props.history.goBack();
          }}
        />
        <span style={{ marginLeft: "10px" }}>添加商品</span>
      </span>
    );

    const onChange = (value, selectedOptions) => {
      console.log(value, selectedOptions);
    };
    const loadData = (selectedOptions) => {
      const targetOption = selectedOptions[0];
      targetOption.loading = true;

      // load options lazily
      setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [
          {
            label: `${targetOption.label} Dynamic 1`,
            value: "dynamic1",
            isLeaf: true,
          },
          {
            label: `${targetOption.label} Dynamic 2`,
            value: "dynamic2",
            isLeaf: true,
          },
        ];
        this.setState({
          options: [...this.state.options],
        });
      }, 1000);
    };
    return (
      <Card title={title}>
        <Form wrapperCol={{ span: 10 }}>
          <Item label="商品名称">
            <Input placeholder="请输入商品名称" />
          </Item>
          <Item label="商品描述">
            <TextArea
              placeholder="请输入商品描述"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Item>
          <Item label="商品价格">
            <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
          </Item>
          <Item label="商品分类">
            <Cascader
              options={this.state.options}
              loadData={loadData}
              onChange={onChange}
              changeOnSelect
            />
          </Item>
          <Item label="商品图片">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Item>
          <Item label="商品详情">
            <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
          </Item>
          <Item>
            <Button type="primary">提交</Button>
          </Item>
        </Form>
      </Card>
    );
  }
}
