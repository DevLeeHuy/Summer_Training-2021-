const express = require("express");
const router = express.Router();
const favoriteCtrl = require("../controllers/favorite.controller");

router.get("/", favoriteCtrl.getFavoriteList);
router.post("/", favoriteCtrl.add);
router.delete("/:productId", favoriteCtrl.remove);

module.exports = router;
