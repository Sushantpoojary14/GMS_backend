const db = require("../../databases/connection");
const { Op } = require("@sequelize/core");

const currentDate = new Date().toJSON().slice(0, 10);
const date = new Date();
const options = { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const indianTime = date.toLocaleTimeString('en-US', options);
const Time = `${
  indianTime.slice(0, 6).split(":", 2).join(":")
}${indianTime.slice(8, 11)}`;
console.log(`Time: ${date.toTimeString().slice(0, 6).split(":", 2).join(":")}`);
const m_paymentObj = {
  model: db.M_payment,
  // as: 'M_payment',
  attributes: ["id", "start_date", "end_date", "fee", "total_month"],
  where: {
    end_date: {
      [Op.gte]: currentDate,
    },
  },
  separate: true,
  limit: 1,
  order: [["createdAt", "DESC"]],
  required: false,
};

const m_attendanceObj = {
  model: db.Attendance,
  // as: 'M_payment',
  attributes: ["id", "date", "time"],
  where: {
    date: {
      [Op.eq]: currentDate,
    },
  },
  separate: true,
  limit: 1,
  order: [["createdAt", "DESC"]],
  required: false,
};
const t_paymentObj = {
  model: db.T_payment,
  // as: 'M_payment',
  attributes: ["id", "start_date", "end_date", "fee", "total_month"],
  where: {
    end_date: {
      [Op.gte]: currentDate,
    },
  },
  separate: true,
  limit: 1,
  order: [["createdAt", "DESC"]],
  required: false,
};

module.exports = { m_paymentObj, currentDate, m_attendanceObj, Time ,t_paymentObj};
