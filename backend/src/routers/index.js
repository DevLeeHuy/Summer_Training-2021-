const express = require("express");
const router = express.Router();

router.use("/products", require("./product.route"));
router.use("/categories", require("./category.route"));

router.use("/cart", require("./cart.route"));
router.use("/order", require("./order.route"));

router.use("/accounts", require("./account.route"));
router.use("/user", require("./user.route"));

router.use("/", require("./main.route"));

module.exports = router;
