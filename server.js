const mongoose = require("mongoose");
// const express = require("express");
const app = require("./app");
// const app = express();
const { DB_HOST, PORT = 3000 } = process.env;
require("dotenv").config();

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
