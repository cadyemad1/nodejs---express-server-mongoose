const mongooes = require("mongoose");

const todoSchema = new mongooes.Schema(
  {
    userId: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: true,
      min: 5,
      max: 20
    },
    tags: [
      {
        type: String,
        maxlength: 10
      }
    ]
  },
  { timestamps: true }
);

todoSchema.index({ title: 1, type: -1 });

const Todo = mongooes.model("Todo", todoSchema);

module.exports = Todo;
