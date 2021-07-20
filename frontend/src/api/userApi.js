import axiosClient from "./axiosClient";
const url = "user";
export default Object.assign({
  login: function (body) {
    return axiosClient.post("/login", body);
  },
  register: function (body) {
    return axiosClient.post(url, body);
  },
  update: function (body, id) {
    return axiosClient.put(url + `/${id}`, body);
  },
  shoppingCart: function (params) {
    return axiosClient.get("/cart", { params });
  },
  favorite_list: function (params) {
    return axiosClient.get("/favorite_list", { params });
  },
  checkout: function (body) {
    return axiosClient.post("/checkout", body);
  },
});
