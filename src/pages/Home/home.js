import React, { Component } from "react";
import "./home.css";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.count);
  }
  render() {
    return (
      <div className="home">
        <h1>欢迎来到react-admin后台管理系统</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.itemState.count,
});

export default connect(mapStateToProps)(Home);
