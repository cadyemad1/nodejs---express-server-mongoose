const express = require("express");
require("./db");

const userRouter = require("./routers/user");
const todoRoute = require("./routers/todo");

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use(express.json());

app.use("/user", userRouter);
app.use("/todo", todoRoute);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
