import React, { Component } from "react";
import { Card, Button } from "antd";
import ReactECharts from "echarts-for-react";
import "echarts/i18n/langFR";

export default class Line extends Component {
  // 返回柱状图的配置对象
  getOption = () => {
    return {
      toolbox: {
        feature: {
          saveAsImage: {},
          dataZoom: {},
          restore: {},
        },
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "line",
          data: [5, 20, 36, 10, 10, 20],
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
