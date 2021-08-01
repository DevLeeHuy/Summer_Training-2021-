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
      //Add child category
      if (req.body.parentCategoryId) {
        newCategory.subCategory = undefined;
        const topCate = await Category.findById(req.body.parentCategoryId);

        //Check existence
        const isExistedCategory = topCate.subCategory.find(
          (cate) => cate.name === newCategory.name
        );
        if (isExistedCategory) {
          return res.status(400).json({ message: "Category already exists" });
        }
        topCate.subCategory.push(newCategory);
        await topCate.save();
      }
      //Add parent category
      else {
        //Check existence
        const isExistedCategory = await Category.findOne({
          name: newCategory.name,
        });
        if (!!isExistedCategory) {
          return res.status(400).json({ message: "Category already exists" });
        }
        await newCategory.save();
      }
      res.status(201).json({ newCategory });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  update: async function (req, res) {
    const { categoryId, parentCategoryId, name } = req.body;
    try {
      if (parentCategoryId) {
        await Category.updateOne(
          { "subCategory._id": categoryId },
          { $set: { "subCategory.$.name": name } }
        );
      }
      await Category.updateOne({ _id: categoryId }, { name });
      res.status(201).json({ success: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  delete: async function (req, res) {
    const { categoryId, parentCategoryId } = req.body;
    try {
      if (parentCategoryId) {
        await Category.updateOne(
          { _id: parentCategoryId },
          { $pull: { subCategory: { _id: categoryId } } }
        );
      } else await Category.deleteOne({ _id: categoryId });

      res.status(201).json({ success: true });
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
