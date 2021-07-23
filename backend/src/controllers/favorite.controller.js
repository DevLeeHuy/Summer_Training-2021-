const User = require("../models/User.model");
const Product = require("../models/Product.model");

module.exports = {
  getFavoriteList: function (req, res) {
    User.findById(req.query.userId)
      .populate("favorite_list")
      .then((user) => {
        return res.json({ favorite_list: user.favorite_list });
      })
      .catch((err) => {
        res.status(404).json({ message: err.message });
      });
  },
  add: async function (req, res) {
    const productId = req.body.productId;
    const userId = req.body.userId;
    try {
      const product = await Product.findById(productId);
      const user = await User.findById(userId);
      const isExisted = user.favorite_list.indexOf(productId);
      if (isExisted < 0) {
        user.favorite_list.push(product);
        await user.save();
      }
      return res.status(200).json({ success: true, user });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
  remove: async function (req, res) {
    const productId = req.params.productId;
    const userId = req.body.userId;
    try {
      const user = await User.findById(userId);
      const isExisted = user.favorite_list.indexOf(productId);
      if (isExisted >= 0) {
        user.favorite_list.splice(isExisted, 1);
        await user.save();
      }
      return res.status(200).json({ success: true, user });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
};
