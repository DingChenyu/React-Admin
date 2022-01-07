// 包含应用中所有请求函数的模块
// url--conf
import { conf } from "./conf";
import ajax from "./ajax";

// 登录
// export function reqLogin(username, password) {
//   return ajax("/login", { username, password }, "POST");
// }
export const reqLogin = (username, password) =>
  ajax(conf + "/login", { username, password }, "POST");

// 添加用户
export const reqAddUser = (user) =>
  ajax(conf + "/manage/user/add", { user }, "POST");

// 查询天气
export const researchWeather = (city) =>
  ajax(
    `https://restapi.amap.com/v3/weather/weatherInfo?key=5176f1e88a245e1722f91aa87672f649&city=${city}&extensions=base`,
    { city },
    "GET"
  );

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) =>
  ajax(conf + "/manage/category/list", { parentId }, "GET");

// 添加分类
export const reqAddCategory = (parentId, categoryName) =>
  ajax(conf + "/manage/category/add", { parentId, categoryName }, "POST");

// 更新分类
export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax(conf + "/manage/category/update", { categoryId, categoryName }, "POST");
