const Bill = require("../models/Bill.model");

module.exports = {
  get: async function (req, res) {
    try {
      const userId = req.query.userId;
      const orders = await Bill.find({ customer: userId }).populate(
        "list_product"
      );
      res.json({ orders });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
