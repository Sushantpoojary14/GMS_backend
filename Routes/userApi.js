const express = require("express");
const bodyParser = require("body-parser");
const userRouter = express.Router();
const tokenCheck = require("../middleware/tokenCheck");
userRouter.use(tokenCheck);
const userC = require("../controller/userController");

userRouter.get("/profile", (req, res) => {
  res.send({
    message: "hello user",
  });
});

userRouter.get("/all-count-data/:user_id", (req, res) =>
  userC.allCountData(req, res)
);
userRouter.get("/all-trainer-data/:user_id", (req, res) =>
  userC.allTrainerData(req, res)
);
userRouter.post("/add-trainer-data/:user_id", (req, res) =>
  userC.addTrainerData(req, res)
);
module.exports = userRouter;
