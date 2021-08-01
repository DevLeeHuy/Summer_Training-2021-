const express = require("express");
const router = express.Router();
const cateCtrl = require("../controllers/category.controller");

router.post("/", cateCtrl.create);
router.get("/", cateCtrl.getAll);
router.put("/", cateCtrl.update);
router.delete("/", cateCtrl.delete);

module.exports = router;
