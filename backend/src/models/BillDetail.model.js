const mongoose = require("mongoose");
const schema = mongoose.Schema;
const BillDetail = new schema({
  product: {
    type: Object,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  inBill: {
    type: schema.Types.ObjectId,
    ref: "Bill",
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("BillDetail", BillDetail);
