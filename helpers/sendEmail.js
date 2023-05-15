const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "andrii.bogomolov@meta.ua",
    pass: META_PASSWORD,
  },
};

const sendEmail = async (data) => {
  const transport = nodemailer.createTransport(nodemailerConfig);

  const email = { ...data, from: "andrii.bogomolov@meta.ua" };
  return transport.sendMail(email);
};

module.exports = sendEmail;
