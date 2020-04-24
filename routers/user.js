const express = require("express");
const User = require("../models/User");
const Todo = require("../models/Todo");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    console.log("**", user);
    await user.save();
    res.json({ message: "user was registered successfully" });
  } catch (err) {
    console.log("**", err);
    res.status(404).send(err.errmsg);
  }
});

router.post("/login", async (req, res, next) => {
  try {
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
      res
        .status(200)
        .send({ message: "Logged in successfully", username, userTodos });
    } else {
      const error = new Error("wrong username or password!");
      error.statusCode = 401;
      throw error;
    }
  } catch (err) {
    // res.send(401).json({ error: "invalid credentials" });
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).send("Deleted");
  } catch (err) {
    res.status(404).send(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true
    });
    res
      .status(200)
      .json({ message: "user was edited successfully", updatedUser });
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
