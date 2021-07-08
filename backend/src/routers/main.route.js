const express = require("express");
const router = express.Router();
const mainCtrl = require("../controllers/main.controller");
const upload = require("../middlewares/uploadFile.mdw");

router.post("/login", mainCtrl.login);
router.post("/register", upload("user").single("picture"), mainCtrl.register);
router.get("/logout", mainCtrl.logout);
router.post("/checkout", mainCtrl.checkout);
router.get("/favorite_list", mainCtrl.FavoriteList);
router.get("/rating", mainCtrl.rating);
router.get("/cart", mainCtrl.shoppingCart);
router.get("/", mainCtrl.index);

module.exports = router;
