const express = require("express");
const router = express.Router();
const mainCtrl = require("../controllers/main.controller");

router.post("/login", mainCtrl.login);
router.get("/logout", mainCtrl.logout);
router.post("/checkout", mainCtrl.checkout);
router.get("/favorite_list", mainCtrl.FavoriteList);
router.get("/rating", mainCtrl.rating);
router.get("/", mainCtrl.index);

module.exports = router;
