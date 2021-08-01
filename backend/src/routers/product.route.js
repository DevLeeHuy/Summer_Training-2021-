const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/product.controller");
const upload = require("../middlewares/uploadFile.mdw");

router.get("/", productCtrl.getAll);
router.post(
  "/",
  upload("product").fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 6 },
  ]),
  productCtrl.create
);
router.put(
  "/:id",
  upload("product").fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 6 },
  ]),
  productCtrl.update
);
router.delete("/:id", productCtrl.delete);
router.get("/:id", productCtrl.getById);
module.exports = router;
