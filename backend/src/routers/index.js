const express = require("express");
const router = express.Router();

router.use("/products", require("./product.route"));
router.use("/cart", require("./cart.route"));
router.use("/categories", require("./category.route"));
router.use("/accounts", require("./account.route"));
router.use("/", require("./main.route"));

module.exports = router;
