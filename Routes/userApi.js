const express = require("express");
const bodyParser = require("body-parser");
const userRouter = express.Router();
const multer = require("multer");

const m_upload = multer({ dest: 'assets/images/member' })

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

userRouter.get("/trainer-data/:t_id", (req, res) =>
  userC.TrainerData(req, res)
);
userRouter.post("/add-trainer-data/:user_id", (req, res) =>
  userC.addTrainerData(req, res)
);
userRouter.put("/update-trainer-data/:t_id", (req, res) =>
  userC.updateTrainerData(req, res)
);

userRouter.delete("/delete-trainer/:t_id/:user_id", (req, res) =>
  userC.deleteTrainerData(req, res)
);
userRouter.post("/add-trainer-payment/:t_id", (req, res) =>
  userC.addTrainerPayment(req, res)
);

userRouter.put("/update-trainer-payment/:tp_id", (req, res) =>
  userC.updateTrainerPayment(req, res)
);

userRouter.delete("/delete-trainer-payment/:tp_id", (req, res) =>
  userC.deleteTrainerPayment(req, res)
);
userRouter.get("/all-member-data/:user_id", (req, res) =>
  userC.allMemberData(req, res)
);
userRouter.post(
  "/add-member-data/:user_id",
  m_upload.single("m_image"),
  (req, res) => userC.addMemberData(req, res)
);
userRouter.get("/member-data/:m_id", (req, res) => userC.memberData(req, res));

userRouter.put(
  "/update-member-data/:m_id",
  m_upload.single("m_image"),
  (req, res) => userC.updateMemberData(req, res)
);

userRouter.post("/add-member-payment/:m_id", (req, res) =>
  userC.addMemberPayment(req, res)
);

userRouter.put("/update-member-payment/:mp_id", (req, res) =>
  userC.updateMemberPayment(req, res)
);

userRouter.delete("/delete-member-payment/:mp_id", (req, res) =>
  userC.deleteMemberPayment(req, res)
);
userRouter.get("/all-member-attendance/:user_id", (req, res) =>
  userC.allMemberAttendance(req, res)
);

userRouter.post("/add-member-attendance/:m_id", (req, res) =>
  userC.addMemberAttendance(req, res)
);
userRouter.post("/member-date-attendance/:user_id", (req, res) =>
  userC.MemberDateAttendance(req, res)
);

userRouter.delete("/delete-member/:m_id/:user_id", (req, res) =>
  userC.deleteMember(req, res)
);
module.exports = userRouter;
