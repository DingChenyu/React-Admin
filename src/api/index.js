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
export const reqAddUser = (user) => ajax("/manage/user/add", { user }, "POST");
