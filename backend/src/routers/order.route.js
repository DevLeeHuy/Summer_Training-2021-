const express = require("express");
const router = express.Router();
const orderCtrl = require("../controllers/order.controller");

router.get("/", orderCtrl.get);

module.exports = router;
