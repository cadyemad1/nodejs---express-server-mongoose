require("dotenv").config();
const express = require("express");
require("./db");
const { port } = require("./config");

const userRouter = require("./routers/user");
const todoRoute = require("./routers/todo");

const app = express();
const hostname = "127.0.0.1";

app.use(express.json());

app.use("/user", userRouter);
app.use("/todo", todoRoute);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
