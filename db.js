const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/todo-list", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to mongo");
  })
  .catch(err => {
    console.log("ERROR", err);
    process.exit(1);
  });
