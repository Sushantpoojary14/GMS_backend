const express = require("express");
const bodyParser = require("body-parser");
const adminTokenCheck = require("../middleware/adminTokenCheck");
const adminC = require("../controller/adminController");
const adminAC = require("../controller/adminAuthController");
const adminRouter = express.Router();
adminRouter.use(adminTokenCheck);

adminRouter.get("/profile", (req, res) => {
  res.send({
    message: "hello admin",
  });
});

adminRouter.get("/all-user-data", (req, res) => adminC.userAllData(req, res));
adminRouter.post("/add-user-data", (req, res) => adminC.addUserData(req, res));
adminRouter.get("/count-user-data", (req, res) => adminC.userCountData(req, res));
adminRouter.get("/logout", (req, res) => adminAC.adminLogout(req, res));
module.exports = adminRouter;
