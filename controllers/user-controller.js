const { UserModel, BookModel } = require("../models/index");

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find({ _id });

  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No books found",
    });
  }

  res.status(200).json({
    success: true,
    data: users,
  });
};

exports.getSingleUserById = async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findById({ _id: id });

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  } else {
    res.status(200).json({
      success: true,
      data: user,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.deleteOne({ _id: id });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User to be deleted is not found",
    });
  }

  return res
    .status(200)
    .json({ success: true, message: "Deleted the user Successfully" });
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updatedUserData = await UserModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        ...data,
      },
    },
    {
      new: true, // this is for reloading purpose
    }
  );

  return res.status(200).json({
    success: true,
    data: updatedUserData,
  });
};

exports.createNewUser = async (req, res) => {
  const { name, surname, email, subscriptionType, subscriptionDate } = req.body;
  const newUser = await UserModel.create({
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    data: newUser,
  });
};
