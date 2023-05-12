const express = require("express");

const ctrl = require("../../controllers/auth");

const { validate, authenticate } = require("../../middlewares");

const { registerSchema, loginSchema } = require("../../models/user");

const router = express.Router();

router.post("/register", validate(registerSchema), ctrl.register);

router.post("/login", validate(loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
