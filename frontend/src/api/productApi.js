import axiosClient from "./axiosClient";
const url = "/products";

export default Object.assign({
  getAll: function () {
    return axiosClient.get(url);
  },
  getById: function (id) {
    return axiosClient.get(url + `/${id}`);
  },
  getProducts: function (params) {
    return axiosClient.get(url, { params });
  },
  add: function (body) {
    return axiosClient.post(url, body);
  },

  update: function (body, id) {
    return axiosClient.put(url + `/${id}`, body);
  },
  remove: function (productId) {
    return axiosClient.delete(url + `/${productId}`);
  },
});
