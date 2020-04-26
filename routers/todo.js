const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const validationReqs = require("../middlewares/validateRequests");
const Todo = require("../models/Todo");
const verifyUser = require("../middlewares/auth");
const asyncHandler = require("../Handler/asyncHandler");

router.post(
  "/",
  validationReqs([check("title").notEmpty()]),
  verifyUser,
  asyncHandler(async (req, res, next) => {
    req.body.userId = req.user.id;
    const todo = new Todo(req.body);
    await todo.save();
    res.json({ message: "todo was created successfully" });
  })
);

router.get(
  "/:userId",
  verifyUser,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const todos = await Todo.find({ userId });
    res.send(todos);
  })
);

router.delete(
  "/:id",
  verifyUser,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    res.status(200).send("Deleted");
  })
);

router.patch(
  "/:id",
  verifyUser,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true
    });
    res
      .status(200)
      .json({ message: "todo was edited successfully", updatedTodo });
  })
);
module.exports = router;
