const User = require("../models/User.model");
const Product = require("../models/Product.model");
const getUser = (userId) => {
  return User.findById(userId).populate({
    path: "cart",
    populate: "product",
  });
};

module.exports = {
  getAll: async function (req, res) {
    try {
      const user = await getUser(req.query.userId);
      res.status(200).json({ success: true, cart: user.cart });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  add: async function (req, res) {
    try {
      const user = await getUser(req.body.userId);
      const product = req.body.productId;
      const quantity = +req.body.quantity || 1;
      const existedProduct = user.cart.find(
        (element) => element.product._id.toString() === product
      );

      if (existedProduct) {
        existedProduct.quantity += quantity;
      } else {
        const newItem = {
          product: await Product.findById(product),
          quantity,
        };
        user.cart.push(newItem);
      }

      await user.save();

      res.status(200).json({ success: true, cart: user.cart });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  update: async function (req, res) {
    try {
      const user = await getUser(req.body.userId);

      const product = req.params.productId;
      const quantity = +req.body.quantity || 1;
      const existedProduct = user.cart.find(
        (element) => element.product._id.toString() === product
      );
      existedProduct.quantity = quantity;

      await user.save();

      res.status(200).json({ success: true, cart: user.cart });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  delete: async function (req, res) {
    try {
      const user = await getUser(req.body.userId);

      const product = req.params.productId;
      const existedProduct = user.cart.find(
        (element) => element.product._id.toString() === product
      );
      if (existedProduct)
        user.cart.splice(user.cart.indexOf(existedProduct), 1);

      await user.save();

      res.status(200).json({ success: true, cart: user.cart });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
