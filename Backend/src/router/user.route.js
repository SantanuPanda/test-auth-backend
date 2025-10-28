const express = require("express");
const usermodel = require("../model/user.model");
const JWT = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new usermodel({ email, password });
    await newUser.save();

    const token = JWT.sign({ id: newUser._id }, "mysecretkey", {
      expiresIn: "1h",
    });

    // Set cookie
    res.cookie("test_token", token, {
      httpOnly: true,
      secure: true, // must be true for HTTPS
      sameSite: "None", // must be None for cross-origin
      path: "/",
      maxAge: 3600000,
    });

    // Also send token in response body as backup
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
