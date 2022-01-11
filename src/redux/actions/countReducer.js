import axios from "axios";
export function changeCount(data) {
  return {
    type: "COUNTER_CHANGE",
    payload: data,
  };
}

// export function changeCountFun() {
//   return (dispatch) => {
//     return fetchRequest("/serve", "GET", "")
//       .then((res) => {
//         console.log(res);
//         dispatch(changeCount(res));
//         return res;
//       })
//       .catch((error) => {
//         throw new Error(error);
//       });
//   };
// }

export function changeCountFun() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let promise;
      promise = axios.get("http://127.0.0.1:3000/manage/category/list");
      // 成功了调用resolve
      promise
        .then((response) => {
          resolve(response.data);
          console.log("success", response.data);
          dispatch(changeCount(response.data));
        })
        //   失败了不调用reject，而是提示异常信息
        .catch((error) => {
          //   reject(error);
          console.log(error);
        });
    });
  };
}
