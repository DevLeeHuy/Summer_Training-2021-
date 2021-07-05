import axiosClient from "./axiosClient";

export default Object.assign({
  login: function (body) {
    return axiosClient.post("/login", body);
  },
});
