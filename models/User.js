const mongooes = require("mongoose");
// const util = require("util");
var bcrypt = require("bcryptjs");

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

userSchema.pre("save", async function(next) {
  if (this.password || this.isModified(password)) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

userSchema.methods.checkPassword = function(userPassword) {
  currentDoc = this;
  return bcrypt.compare(userPassword, currentDoc.password);
};

const User = mongooes.model("User", userSchema);

module.exports = User;
