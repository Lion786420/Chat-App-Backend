const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  // if (password.length <= 3) {
  //   response
  //     .status(400)
  //     .json({ error: "Password has to be over 3 characters" })
  //     .end();
  //   return;
  // }
  try {
    const passwordHash = await bcrypt.hash(password, config.SALT_ROUNDS);
    const user = new User({
      username: username,
      email: email,
      passwordHash: passwordHash,
    });
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: "User registration failed" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(404).json({ error: "Invalid email or password" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, config.SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = userRouter;
