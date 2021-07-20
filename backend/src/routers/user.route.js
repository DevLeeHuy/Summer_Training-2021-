const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const upload = require("../middlewares/uploadFile.mdw");

// router.get('/', )
router.post("/", upload("user").single("picture"), userCtrl.create);
router.put("/:id", upload("user").single("picture"), userCtrl.update);
router.delete("/:id", userCtrl.remove);

module.exports = router;
