// 封装axios请求的函数模块
import axios from "axios";
import { message } from "antd";

export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    // 执行异步ajax请求
    if (type === "GET") {
      //发get请求
      promise = axios.get(url, { params: data }); //配置对象，指定请求参数
    } else {
      //发post请求
      promise = axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    }
    // 成功了调用resolve
    promise
      .then((response) => {
        resolve(response.data);
      })
      //   失败了不调用reject，而是提示异常信息
      .catch((error) => {
        // reject(error);
        message.error("出错啦～");
      });
  });
}
