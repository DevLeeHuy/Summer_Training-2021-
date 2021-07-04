const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Category = new schema(
  {
    name: { type: String },

    subCategory: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", Category);
