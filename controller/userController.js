const db = require("../databases/connection");

const allCountData = async (req, res) => {
  try {
    const trainer = await db.Trainer.findAndCountAll({
      where: { u_id: req.params.user_id },
    });
    const active_members = await db.Member.findAndCountAll({
      where: { u_id: req.params.user_id, status: 1 },
    });
    const members = await db.Member.findAndCountAll({
      where: { u_id: req.params.user_id },
    });

    return res.status(200).json({
      message: "All data count",
      trainer_data: trainer.count,
      member_data: members.count,
      active_member_data: active_members.count,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
const allTrainerData = async (req, res) => {
  db.Trainer.findAll({
    where: { u_id: req.params.user_id },
    attributes: ["id", "name", "payment", "gender", "email", "phone"],
  })
    .then((data) => {
      return res.status(200).json({
        message: "All trainer count",
        trainer_data: data,
      });
    })
    .catch(() => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};
const addTrainerData = (req, res) => {
  console.log(req.body);
  db.Trainer.create({
    email: req.body.email,
    name: req.body.name,
    u_id: req.params.user_id,
    gender: req.body.gender,
    phone: req.body.phone,
    payment: req.body.payment,
    DOB: req.body.DOB,
  })
    .then(async (data) => {
      console.log(data);
      const newData = await db.Trainer.findAll({
        where: {
          u_id: req.params.user_id,
        },
        attributes: ["id", "name", "gender", "email", "phone", "DOB"],
      });
      return res.status(200).json({
        message: "success",
        trainer_data: newData,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while creating",
        error: err,
      });
    });
};
module.exports = { allCountData, allTrainerData, addTrainerData };
