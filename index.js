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

/*
Route - /users/:id
method - GET
description - get single user by their id
access - public
parameter - id
*/

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "User doesn't exists",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User found",
    data: user,
  });
});

/*
Route - /users
method - POST
description - Creating new user
access - public
parameter - none
*/

app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((elem) => elem.id === id);

  if (user) {
    return res.status(404).json({
      sucess: false,
      message: "This ID already in use",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({
    success: true,
    message: "User added successfully",
    data: users,
  });
});

/*
Route - /users/:id
method - PUT
description - Updating a user by their id
access - public
parameter - ID
*/

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "User doesn't exists",
    });
  }
  const UpdatingUserInfo = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User Information Updated successfully",
    data: UpdatingUserInfo,
  });
});

// app.get("/*", (req, res) => {
//   res.status(404).json({
//     message: "User doesn't exist",
//     success: false,
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is runnning at ${PORT}`);
});
