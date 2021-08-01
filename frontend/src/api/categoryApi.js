import axiosClient from "./axiosClient";
const url = "/categories";

export default Object.assign({
  getAll: function () {
    return axiosClient.get(url);
  },
  add: function (body) {
    return axiosClient.post(url, body);
  },
  update: function (body) {
    return axiosClient.put(url, body);
  },
  remove: function (data) {
    return axiosClient.delete(url, { data });
  },
});
