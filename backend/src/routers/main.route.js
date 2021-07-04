const express = require("express");
const router = express.Router();
const mainCtrl = require("../controllers/main.controller");

router.post("/login", mainCtrl.login);
router.post("/register", mainCtrl.register);
router.get("/logout", mainCtrl.logout);
router.post("/checkout", mainCtrl.checkout);
router.get("/addToFavoriteList", mainCtrl.addToFavoriteList);
router.get("/removeFromFavoriteList", mainCtrl.removeFromFavoriteList);
router.get("/rating", mainCtrl.rating);
router.get("/", mainCtrl.index);

module.exports = router;
