const mongoose = require("mongoose");
const schema = mongoose.Schema;

const SubCategory = new schema({
  name: { type: String },
});

const Category = new schema(
  {
    name: { type: String },

    subCategory: [SubCategory],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", Category);
