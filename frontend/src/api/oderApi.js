import axiosClient from "./axiosClient";
const url = "/order";

export default Object.assign({
  getOrders: function (params) {
    return axiosClient.get(url, { params });
  },
});
