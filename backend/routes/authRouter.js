const express = require("express");
const { register, login } = require("../Controller/AuthController");
const routerAuth = express.Router();

routerAuth.post("/api/auth/login", login);
routerAuth.post("/api/auth/register", register);
module.exports = {
  routerAuth,
};
