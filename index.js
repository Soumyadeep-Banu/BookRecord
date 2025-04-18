const express = require("express");
const { users } = require("./data/users.json");
// const { books } = require("./data/books.json");
const app = express();

const PORT = 8085;

app.use(express.json());

app.get("/", (req, res) => {
  //   res.status(200).send("Server is running"); //we can not enter different inputs through this send function
  res.status(200).json({
    message: "Server is running",
    data: "hey",
  });
});

/*
Route - /users
method - GET
description - get all user
access - public
parameter - none
*/

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.listen(PORT, () => {
  console.log(`Server is runnning at ${PORT}`);
});
