const mongoose = require("mongoose");
const schema = mongoose.Schema;

const rating = new schema({
  _id: false,
  num_of_reviewers: { type: Number, default: 0 },
  star: { type: Number, default: 0 },
});
const Product = new schema(
  {
    name: { type: String },
    category: { type: Object },
    description: { type: String },
    image: {
      thumbnail: { type: String, required: true },
      photos: [{ type: String }],
    },
    quantity: {
      S: { type: Number, default: 1 },
      M: { type: Number, default: 1 },
      L: { type: Number, default: 1 },
    },
    price: { type: Number },

    rating: { type: rating },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Product", Product);
