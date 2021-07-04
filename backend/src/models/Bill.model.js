const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Bill = new schema(
  {
    list_product: [
      {
        type: schema.Types.ObjectId,
        ref: "BillDetail",
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
    customer: {
      type: schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bill", Bill);
