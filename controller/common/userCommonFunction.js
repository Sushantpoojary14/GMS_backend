const db = require("../../databases/connection");
const { Op } = require("@sequelize/core");
const { m_paymentObj, m_attendanceObj,t_paymentObj } = require("../common/userObject");

const cAllMemberData = async (user_id) => {
  try {
    const data = await db.Member.findAll({
      where: { u_id: user_id },
      attributes: [
        "id",
        "name",
        // "payment",
        "gender",
        "email",
        "phone",
        "blood_group",
        "program",
        "DOB",
        "occupation",
        "weight_kg",
        "height_cm",
        "join_date",
      ],

      include: {
        ...m_paymentObj,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
const cMemberData = async (m_id) => {
  try {
    const data = await db.Member.findOne({
      where: { id: m_id },
      attributes: [
        "id",
        "name",
        // "payment",
        "gender",
        "email",
        "phone",
        "blood_group",
        "program",
        "DOB",
        "occupation",
        "weight_kg",
        "height_cm",
        "join_date",
      ],

      include: {
        ...m_paymentObj,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const cAllMemberAData = async (user_id) => {
  try {
    const data = await db.Member.findAll({
      where: { u_id: user_id },
      attributes: ["id", "name", "gender", "phone"],

      include: {
        ...m_attendanceObj,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
const cMemberAData = async (m_id) => {
  try {
    const data = await db.Member.findOne({
      where: { id: m_id },
      attributes: ["id", "name", "gender", "phone"],

      include: {
        ...m_attendanceObj,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const cAllTrainerData = async (user_id) => {
  try {
    const data = db.Trainer.findAll({
      where: { u_id: user_id },
      attributes: ["id", "name", "payment", "gender", "email", "phone","DOB"],
      include:{
        ...t_paymentObj
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const cTrainerData = async (t_id) => {
  try {
    const data = db.Trainer.findOne({
      where: { id: t_id },
      attributes: ["id", "name", "payment", "gender", "email", "phone","DOB"],
      include:{
        ...t_paymentObj
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  cAllMemberData,
  cMemberData,
  cAllMemberAData,
  cMemberAData,
  cAllTrainerData,
  cTrainerData
};
