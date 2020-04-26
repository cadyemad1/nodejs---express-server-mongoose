const express = require("express");
const User = require("../models/User");
const Todo = require("../models/Todo");
const verifyUser = require("../middlewares/auth");
const router = express.Router();
const validationReqs = require("../middlewares/validateRequests");
const { check } = require("express-validator");
const asyncHandler = require("../Handler/asyncHandler");

router.post(
  "/register",
  validationReqs([
    check("username").notEmpty(),
    check("password").notEmpty(),
    check("firstName").notEmpty()
  ]),
  asyncHandler(async (req, res, next) => {
    const user = new User(req.body);
    console.log("**", user);
    await user.save();
    res.json({ message: "user was registered successfully" });
  })
);

router.post(
  "/login",
  validationReqs([check("username").notEmpty(), check("password").notEmpty()]),
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username
    });
    if (!user) {
      const error = new Error("wrong username or password!");
      error.statusCode = 401;
      throw error;
    }
    const userTodos = await Todo.find({ userId: user._id }).populate("userId");
    const isMatch = await user.checkPassword(password);
    if (isMatch) {
      const token = await user.generateToken();
      res.status(200).send({
        message: "Logged in successfully",
        username,
        userTodos,
        token
      });
    } else {
      const error = new Error("wrong username or password!");
      error.statusCode = 401;
      throw error;
    }
  })
);

router.get(
  "/",
  verifyUser,
  asyncHandler(async (req, res, next) => {
    const users = await User.find({});
    res.send(users);
  })
);

router.delete(
  "/",
  verifyUser,
  asyncHandler(async (req, res, next) => {
    await req.user.remove();
    res.status(200).send("Deleted");
  })
);

router.patch(
  "/",
  verifyUser,
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    const newupdate = Object.entries(req.body);
    newupdate.forEach(el => (user[el[0]] = el[1]));
    await user.save();
    res.status(200).json({ message: "user was edited successfully", user });
  })
);

module.exports = router;
