const express = require("express");
const app = express();

const { register, login } = require("../controller/userAuthController");
const { adminLogin } = require("../controller/adminAuthController");
app.get("/", (req, res) => {
  res.send({
    message: "hello",
  });
});

app.post("/user/register", (req, res) => register(req, res));

app.post("/user/login", (req, res) => login(req, res));

app.post("/admin/login", (req, res) => {

  adminLogin(req, res);
});

module.exports = app;
