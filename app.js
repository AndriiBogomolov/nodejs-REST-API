// evUWo36TJ3JuWoPJ
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const payload = {
  id: "645dd963def04d396b866476",
};
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
console.log(token);

// const decodeToken = jwt.decode(generateToken);
// try {
//   const { id } = jwt.verify(token, SECRET_KEY);
//   console.log(id);
//   const invalidToken = "";
// const result = jwt.verify(invalidToken, SECRET_KEY);
// } catch (error) {
//   console.log(error.message);
// }

const createHashPassword = async (password) => {
  // const salt = await bcrypt.genSalt(10);
  // console.log(salt);
  const result = await bcrypt.hash(password, 10);
  console.log(result);
  const compareResult1 = await bcrypt.compare(password, result);
  console.log(compareResult1);
  const compareResult2 = await bcrypt.compare("1234567", result);
  console.log(compareResult2);
};

createHashPassword("123456");

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
