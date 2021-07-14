const { User } = require("../models/users.models");
const Bcrypt = require("bcrypt");

module.exports = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status("401").json({
          success: false,
          message: "info:name, password,email are required",
        });
      }
      let user = await User.findOne({ email });
      if (user) {
        return res.status("400").json({
          success: false,
          message: "user already exist,please input a valid email",
        });
      }
      const hashedPassword = await Bcrypt.hash(password, 10);
      user = new User({
        name,
        email,
        password: hashedPassword,
      });
      const isSaved = await user.save();
      if (!isSaved) {
        throw new Error("error creating new user");
      }
      res.json({
        sucess: true,
        message: "user created succesfully",
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || password) {
        throw new error("invalid input");
      }
      const user = await User.findOne({ email });
      if (!user) {
        res.send("user does not exist");
      }
      const isMatchedPassword = await Bcrypt.compare(password, user.password);
      if (!isMatchedPassword) {
        return res.status("401").json({ message: "wrong password" });
      }
      req.session.user = {
        id: user._id,
        username: user.name,
      };

      res.json({
        success: "true",
        message: "user logged in successfully",
      });
    } catch (error) {
      throw new Error("login failed");
    }
  },
};
