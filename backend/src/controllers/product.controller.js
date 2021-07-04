const Product = require("../models/Product.model");

var PAGE_SIZE = 2;
var skipItem = 0;
function handleCondition(condition) {
  if (condition.name) {
    condition.name = new RegExp(condition.name); //filter to make relative search product
  }
  if (condition.page > 0) {
    if (condition.limit > 0) {
      PAGE_SIZE = +condition.limit;
      delete condition.limit;
    }
    skipItem = (+condition.page - 1) * PAGE_SIZE;
    delete condition.page;
  }
  return condition;
}

module.exports = {
  getAll: async function (req, res) {
    try {
      const condition = req.query;
      var listProduct = [];
      if (Object.keys(condition).length > 0)
        listProduct = await Product.find(handleCondition(condition))
          .skip(skipItem)
          .limit(PAGE_SIZE);
      else listProduct = await Product.find();
      res.status(200).json(listProduct);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
  create: async function (req, res) {
    const product = req.body;
    const newProduct = new Product(product);
    newProduct.rating = {
      num_of_reviewers: 0,
      star: 0,
    };
    try {
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  update: async function (req, res) {
    const product = req.body;
    try {
      await Product.updateOne({ _id: req.params.id }, product);
      res.status(201).json({ message: "Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  delete: async function (req, res) {
    try {
      await Product.deleteOne({ _id: req.params.id });
      res.status(201).json({ message: "Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  getById: async function (req, res) {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
