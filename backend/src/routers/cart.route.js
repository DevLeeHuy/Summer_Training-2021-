const express = require("express");
const router = express.Router();
const cartCtrl = require("../controllers/cart.controller");

router.get("/", cartCtrl.getAll);
router.post("/", cartCtrl.add);
router.put("/:productId", cartCtrl.update);
router.delete("/:productId", cartCtrl.delete);

module.exports = router;
