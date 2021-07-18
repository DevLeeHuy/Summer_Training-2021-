import axiosClient from "./axiosClient";
const url = "/categories";

export default Object.assign({
  getAll: function () {
    return axiosClient.get(url);
  },
});
