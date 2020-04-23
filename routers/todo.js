const express = require("express");
const Todo = require("../models/Todo");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    req.body.userId = user._id;
    const todo = new Todo(req.body);
    await todo.save();
    res.json({ message: "todo was created successfully" });
  } catch (err) {
    res.status(404).send(err.errmsg);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const todos = await Todo.find({ userId });
    res.send(todos);
  } catch (err) {
    console.log("**", err);
    res.status(404).send(err.errmsg);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    res.status(200).send("Deleted");
  } catch (err) {
    res.status(404).send(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true
    });
    res
      .status(200)
      .json({ message: "todo was edited successfully", updatedTodo });
  } catch (err) {
    res.status(404).send(err);
  }
});
module.exports = router;
