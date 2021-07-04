const Product = require("../models/Product.model");
const User = require("../models/User.model");
const Bill = require("../models/Bill.model");
const BillDetail = require("../models/BillDetail.model");
module.exports = {
  index: async function (req, res) {
    try {
      const listProduct = await Product.find();
      res.status(200).json(listProduct);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  //Sign in - sign up ✅⛔
  register: async function (req, res) {
    const user = req.body;
    if (!user.username || !user.password) {
      return res
        .status(400)
        .json({ message: "Missing username or password value" });
    }
    try {
      const isExisted = await User.findOne({ username: user.username });
      if (isExisted)
        return res.status(400).json({ message: "Existing username" });
      const newUser = new User(user);
      await newUser.save();
      res.status(200).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  login: async function (req, res) {
    const user = req.body;
    try {
      const isUser = await User.find(user);
      if (isUser.length) {
        res.status(200).json(isUser);
      } else {
        res.status(400).json({ success: false });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  logout: async function (req, res) {
    res.status(200).json("listProduct");
  },

  //Check out🤑
  checkout: async function (req, res) {
    const listItem = JSON.parse(req.body.listProduct);
    try {
      const user = await User.findById(req.body.userId);
      const bill = new Bill({
        customer: user,
      });
      for (let item of listItem) {
        let tempProduct = await Product.findById(item.product);
        item.product = tempProduct;
        let billDetail = new BillDetail(item);
        billDetail.price = +tempProduct.price;
        billDetail.inBill = bill._id;
        await billDetail.save();
        bill.list_product.push(billDetail);
        bill.total += billDetail.price;
      }
      await bill.save();
      res.status(201).json(bill);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  //Favorite list💖
  addToFavoriteList: async function (req, res) {
    const productId = req.query.productId;
    const userId = req.query.userId;
    try {
      const product = await Product.findById(productId);
      const user = await User.findById(userId);
      const isExisted = user.favorite_list.indexOf(productId);
      if (isExisted < 0) {
        user.favorite_list.push(product);
        await user.save();
      }
      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  removeFromFavoriteList: async function (req, res) {
    const productId = req.query.productId;
    const userId = req.query.userId;
    try {
      const user = await User.findById(userId);
      const isExisted = user.favorite_list.indexOf(productId);
      if (isExisted >= 0) {
        user.favorite_list.splice(isExisted, 1);
        await user.save();
      }
      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  //Rating⭐⭐⭐⭐⭐
  rating: async function (req, res) {
    const productId = req.query.productId;
    const rating = +req.query.rating;
    try {
      const product = await Product.findById(productId);
      let currentRating = +product.rating.star;
      let numReviewers = +product.rating.num_of_reviewers;
      var updateRating = 0;
      if (numReviewers) {
        updateRating =
          (numReviewers * currentRating + rating) / (numReviewers + 1);
      } else {
        updateRating = rating;
      }
      product.rating.num_of_reviewers = numReviewers + 1;
      product.rating.star = updateRating;
      await product.save();
      res.status(200).json({ success: true, product });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
