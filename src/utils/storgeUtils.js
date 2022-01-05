// 全局存储信息
import store from "store";
const USERINFO = "userInfo";
export default {
  // 保存user
  saveUser(user) {
    // localStorage.setItem(USERINFO, JSON.stringify(user));
    store.set(USERINFO, user);
  },
  // 读取user
  getUser() {
    // return JSON.parse(localStorage.getItem(USERINFO) || "{}");
    return store.get(USERINFO || {});
  },
  // 删除user
  removeUser() {
    // localStorage.removeItem(USERINFO);
    store.remove(USERINFO);
  },
};
