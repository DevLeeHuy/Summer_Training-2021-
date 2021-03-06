const User = require("../models/User.model");

module.exports = {
  create: async function (req, res) {
    const user = {
      ...req.body,
      picture: req.file?.filename || "default-user.png",
    };
    if (!user.username || !user.password) {
      return res
        .status(400)
        .json({ message: "Missing username or password value" });
    }
    try {
      const isExisted = await User.findOne({ username: user.username });
      if (isExisted)
        return res.status(400).json({ message: "Existing username" });
      const newUser = new User(user);
      await newUser.save();
      res.status(200).json({ success: true, user: newUser });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  update: async function (req, res) {
    try {
      let user = await User.findById(req.params.id);
      let userCurPw = req.body.CurrentPassword;
      if (user) {
        let editedUser = {};
        //Change password 🗝️
        if (userCurPw) {
          if (user.password === userCurPw) {
            editedUser = {
              password: req.body.NewPassword,
            };
          } else
            return res
              .status(403)
              .json({ message: "Your password is not correct" });
        }
        // Edit user 💁‍♂️
        else
          editedUser = {
            ...req.body,
            picture: req.file?.filename || user.picture,
          };
        await User.updateOne({ _id: req.params.id }, editedUser);
        user = await User.findById(req.params.id);
        res.status(200).json({ success: true, user });
      } else return res.status(400).json({ message: "Invalid user" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  remove: function (req, res) {},

  authThirdParty: async function (req, res) {
    return res.json({ success: true, user: req.user });
  },
};
