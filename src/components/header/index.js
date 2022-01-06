import React, { Component } from "react";
import "./index.css";
import { researchWeather } from "../../api/index";
import { withRouter } from "react-router-dom";
import storgeUtils from "../../utils/storgeUtils";

class Header extends Component {
  componentDidMount() {
    // let response = await researchWeather("重庆");
    // console.log("success!!", response);
    researchWeather("重庆")
      .then((response) => {
        console.log("===", response.data.lives);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  quit = () => {
    storgeUtils.removeUser();
    this.props.history.replace("/login");
  };
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，admin</span>
          <a onClick={this.quit} href="">
            退出
          </a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
          <div className="header-bottom-right">
            <span>2022-1-6 19:28:27</span>
            <img
              src="http://api.map.baidu.com/images/weather/day/qing.png"
              alt="weather"
            />
            <span>晴</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
