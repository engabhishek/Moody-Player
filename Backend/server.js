require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/DB/db");

connectDb();
app.listen(3000, () => {
  console.log("server runing on port 3000...");
});
