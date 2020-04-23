const mongooes = require("mongoose");

const userSchema = new mongooes.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15
  },
  age: {
    type: Number,
    optional: true,
    min: 13
  }
});

const User = mongooes.model("User", userSchema);

module.exports = User;
