const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cartItem = new schema(
  {
    product: { type: schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1, min: 1 },
  },
  { _id: false }
);

const User = new schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String },
  password: { type: String },
  phone: { type: String },
  email: { type: String },
  picture: { type: String },
  auth: {
    type: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
    id: { type: String },
  },
  cart: [{ type: cartItem }],
  favorite_list: [{ type: schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("User", User);
