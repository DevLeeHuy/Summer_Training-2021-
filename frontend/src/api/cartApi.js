import axiosClient from "./axiosClient";
const url = "/cart";

export default Object.assign({
  get: function () {
    return axiosClient.get(url);
  },
  add: function (body) {
    return axiosClient.post(url, body);
  },
  update: function (body) {
    return axiosClient.put(url + `/${body.productId}`, body);
  },
  delete: function (body) {
    return axiosClient.delete(url + `/${body.productId}`, body);
  },
});
