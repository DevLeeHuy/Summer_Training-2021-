const Product = require("../models/Product.model");
const Category = require("../models/Category.model");

var PAGE_SIZE = 2;
var skipItem = 0;
async function handleCondition(condition) {
  //Search by Name
  if (condition.name) {
    condition.name = new RegExp(condition.name, "i"); //filter to make relative search product
  }

  //Filter by price
  if (condition.priceRange) {
    condition.price = { $lte: condition.priceRange };
    delete condition.priceRange;
  }

  // Filter by Category & sub-category
  if (condition.subCategory) {
    const category = await Category.findOne({
      "subCategory._id": condition.subCategory,
    });
    condition.category = category.subCategory.id(condition.subCategory);
    delete condition.subCategory;
  } else if (condition.category) {
    const category = await Category.findById(condition.category);
    const subCategoryList = category.subCategory;
    condition.category = { $in: subCategoryList };
  }

  //Pagination
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
      if (Object.keys(condition).length > 0) {
        const filters = await handleCondition(condition);
        listProduct = await Product.find(filters)
          .skip(skipItem)
          .limit(PAGE_SIZE);
      } else listProduct = await Product.find();
      res.status(200).json(listProduct);
    } catch (err) {
      console.log(err);
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
