const express = require("express");
const router = express.Router();
const accountCtrl = require("../controllers/account.controller");

router.get("/", accountCtrl.index);

module.exports = router;
