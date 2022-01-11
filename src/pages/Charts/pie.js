import React, { Component } from "react";
import { Card, Button } from "antd";
import ReactECharts from "echarts-for-react";
import "echarts/i18n/langFR";

export default class Pie extends Component {
  // 返回柱状图的配置对象
  getOption = () => {
    return {
      title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  };

  render() {
    return (
      <div>
        <Card>
          <Button type="primary"> 更新</Button>
        </Card>
        <Card title="折线图">
          <ReactECharts option={this.getOption()} />
        </Card>
      </div>
    );
  }
}
