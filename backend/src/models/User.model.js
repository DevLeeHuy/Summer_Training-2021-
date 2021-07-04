const mongoose = require("mongoose");
const schema = mongoose.Schema;

const User = new schema({
  fullname: { type: String },
  username: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  phone: { type: String },
  email: { type: String },
  favorite_list: [{ type: schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("User", User);
