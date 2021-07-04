const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/product.controller");

router.get("/", productCtrl.getAll);
router.post("/", productCtrl.create);
router.put("/:id", productCtrl.update);
router.delete("/:id", productCtrl.delete);
router.get("/:id", productCtrl.getById);
module.exports = router;
