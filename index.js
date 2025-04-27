const express = require("express");

const userRouter = require("./routes/users.js");
const bookRouter = require("./routes/books.js");
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

app.use("/users", userRouter);
app.use("/books", bookRouter);

// app.get("/*", (req, res) => {
//   res.status(404).json({
//     message: "User doesn't exist",
//     success: false,
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is runnning at ${PORT}`);
});
