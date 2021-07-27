import axiosClient from "./axiosClient";
const url = "/user";
export default Object.assign({
  login: function (body) {
    return axiosClient.post("/login", body);
  },
  loginByFacebook: function (access_token) {
    return axiosClient.post(url + "/auth/facebook", { access_token });
  },
  loginByGoogle: function (access_token) {
    return axiosClient.post(url + "/auth/google", { access_token });
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
  favorite_list: function (body, action = "get") {
    switch (action) {
      case "add":
        return axiosClient.post("/favorite", body);
      case "remove":
        return axiosClient.delete(`/favorite/${body.productId}`, {
          data: body,
        });
      default:
        return axiosClient.get("/favorite", { params: body });
    }
  },
  checkout: function (body) {
    return axiosClient.post("/checkout", body);
  },
});
