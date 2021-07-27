const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const upload = require("../middlewares/uploadFile.mdw");
const passport = require("passport");

// router.get('/', )
router.post("/", upload("user").single("picture"), userCtrl.create);
router.put("/:id", upload("user").single("picture"), userCtrl.update);
router.delete("/:id", userCtrl.remove);

router.post(
  "/auth/facebook",
  passport.authenticate("facebook-token", { session: false }),
  userCtrl.authThirdParty
);

router.post(
  "/auth/google",
  passport.authenticate("google-token", { session: false, scope: "photos" }),
  userCtrl.authThirdParty
);

module.exports = router;
