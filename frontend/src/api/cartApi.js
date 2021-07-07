import axiosClient from "./axiosClient";
const url = "/cart";

export default Object.assign({
  handle: function (params) {
    return axiosClient.get(url, { params });
  },
});
