import axiosClient from "./axiosClient";

export default Object.assign({
  login: function (body) {
    return axiosClient.post("/login", body);
  },
  register: function (body) {
    return axiosClient.post("/register", body);
  },
  shoppingCart: function (params) {
    return axiosClient.get("/cart", { params });
  },
});
