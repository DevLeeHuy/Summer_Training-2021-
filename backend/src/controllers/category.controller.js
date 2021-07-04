const Category = require("../models/Category.model");

module.exports = {
  getAll: async function (req, res) {
    try {
      const listCategory = await Category.find();
      res.status(200).json(listCategory);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  create: async function (req, res) {
    const newCategory = new Category(req.body);
    try {
      if (req.body.ofCategory) {
        newCategory.subCategory = undefined;
        const topCate = await Category.findById(req.body.ofCategory);
        topCate.subCategory.push(newCategory);
        await topCate.save();
      } else await newCategory.save();
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  update: async function (req, res) {
    const category = req.body;
    try {
      await Category.updateOne({ _id: req.params.id }, category);
      res.status(201).json({ message: "Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  delete: async function (req, res) {
    try {
      await Category.deleteOne({ _id: req.params.id });
      res.status(201).json({ message: "Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  getById: async function (req, res) {
    try {
      const category = await Category.findById(req.params.id);
      res.status(200).json(category);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
