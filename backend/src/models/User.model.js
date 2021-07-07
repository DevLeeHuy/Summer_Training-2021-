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
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  picture: { type: String },
  cart: [{ type: cartItem }],
  favorite_list: [{ type: schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("User", User);
