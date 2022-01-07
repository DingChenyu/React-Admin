import React, { Component } from "react";
import "./index.css";
import { researchWeather } from "../../api/index";
import { withRouter } from "react-router-dom";
import storgeUtils from "../../utils/storgeUtils";
import moment from "moment";
import { Button } from "antd";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: moment().format("YYYY-MM-DD, h:mm:ss"),
      weather: "",
      title: "首页",
    };
  }

  // 通过componentWillUnmount钩子函数在组件销毁的时候将异步方法撤销
  componentWillUnmount() {
    this.setState = () => false;
  }

  // 1s更新一次时间
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = moment().format("YYYY-MM-DD, h:mm:ss");
      this.setState({ currentTime });
    }, 1000);
  };

  componentDidMount() {
    // 获取天气信息
    researchWeather("重庆")
      .then((response) => {
        console.log("success!!", response.data.lives);
        let weatherList = response.data.lives;
        weatherList.forEach((item) => {
          console.log(item);
          this.setState({
            // currentTime: item.reporttime,
            weather: item.weather,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // 获取当前时间
    this.getTime();
    // 获取当前标题
  }

  // 退出登录 删除local存储的user信息
  quit = () => {
    storgeUtils.removeUser();
    this.props.history.replace("/login");
  };

  // 组件卸载
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalId);
  }

  render() {
    const { currentTime, weather } = this.state;
    // 获取local本地用户信息
    const user = storgeUtils.getUser();

    // 使用this.props.location.pathname获取当前路径
    const path = this.props.location.pathname;
    let title = "首页";
    if (path === "/home") {
      title = "首页";
    } else if (path === "/category") {
      title = "品类管理";
    } else if (path === "/product") {
      title = "商品管理";
    } else if (path === "/users") {
      title = "用户管理";
    } else if (path === "/role") {
      title = "角色管理";
    } else if (path === "/bar") {
      title = "柱线图";
    } else if (path === "/line") {
      title = "折线图";
    } else if (path === "/pie") {
      title = "饼状图";
    }

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{user.username}</span>
          <Button size="small" onClick={this.quit} type="link">
            退出
          </Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            {/* 图片显示阴/晴 */}
            {weather === "晴" ? (
              <img
                src="http://api.map.baidu.com/images/weather/day/qing.png"
                alt="weather"
              />
            ) : (
              <img
                src="http://api.map.baidu.com/images/weather/day/yin.png"
                alt="weather"
              />
            )}
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
