const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("connected to mongoDb");
    })
    .catch((err) => {
      console.error("error connecting to mongoDb:", err);
    });
}
module.exports = connectDb;
