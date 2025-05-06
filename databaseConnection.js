const mongoose = require("mongoose");

function DBconnection() {
  const DB_URL = process.env.MONGO_URL;

  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const db = mongoose.connection;
db.on("error", console.error.bind("Connection error"));
db.once("open", function () {
  console.log("Database connected");
});
module.exports = DBconnection;
