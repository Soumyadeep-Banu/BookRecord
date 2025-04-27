const express = require("express");

const { users } = require("../data/users.json");

const router = express.Router();

/*
Route - /
method - GET
description - get all user
access - public
parameter - none
*/

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/*
Route - /:id
method - GET
description - get single user by their id
access - public
parameter - id
*/

router.get("/:id", (req, res) => {
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
Route - /
method - POST
description - Creating new user
access - public
parameter - none
*/

router.post("/", (req, res) => {
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
Route - /:id
method - PUT
description - Updating a user by their id
access - public
parameter - ID
*/

router.put("/:id", (req, res) => {
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

/*
Route - /:id
method - DELETE
description - Deleting user by their id
access - public
parameter - id
*/

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "User doesn't exists",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  return res.status(200).json({
    success: true,
    message: "Deleting user information sucessfully",
    data: user,
  });
});

module.exports = router;
