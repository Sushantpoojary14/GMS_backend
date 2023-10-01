const db = require("../databases/connection");
const { Op } = require("@sequelize/core");
const { m_paymentObj, currentDate, Time } = require("./common/userObject");

const {
  cAllMemberData,
  cMemberData,
  cAllMemberAData,
  cMemberAData,
  cAllTrainerData,
  cTrainerData
} = require("./common/userCommonFunction");

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
  try {
    const newData = await cAllTrainerData(req.params.user_id);

    return res.status(200).json({
      message: "success",
      trainer_data: newData,
    });
  } catch (error) {
    console.log(error);
  }
};
const TrainerData = async (req, res) => {
  try {
    const newData = await cTrainerData(req.params.t_id);

    return res.status(200).json({
      message: "success",
      trainer_data: newData,
    }); 
  } catch (error) {
    console.log(error);
  }
};
const addTrainerData = (req, res) => {
  // console.log(req.body);
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
      // console.log(data);
      try {
        const newData = await cAllTrainerData(req.params.user_id);
        return res.status(200).json({
          message: "success",
          trainer_data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while creating",
        error: err,
      });
    });
};


const updateTrainerData = (req, res) => {
  // console.log(req.params.m_id );

  db.Trainer.update(
    {
      email: req.body.email,
      name: req.body.name,
      u_id: req.params.user_id,
      gender: req.body.gender,
      phone: req.body.phone,
      payment: req.body.payment,
      DOB: req.body.DOB,
    },
    {
      where: {
        id: req.params.t_id,
      },
    }
  )
    .then(async () => {
      try {
        const newData = await cTrainerData(req.params.t_id);

        return res.status(200).json({
          message: "success",
         trainer_data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while updating",
        error: err,
      });
    });
};

const deleteTrainerData = (req, res) => {
  db.Trainer.destroy({
    where: {
      id: req.params.t_id,
    },
  })
    .then(async (data) => {
      console.log(data);
      try {
        const newData = await cAllTrainerData(req.params.user_id);
        // console.log(newData);
        return res.status(200).json({
          message: "success",
          trainer_data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong while deleting",
        err: err,
      });
    });
};
const addTrainerPayment = (req, res) => {
  // console.log(req.body);

  db.T_payment.create({
    t_id: req.params.t_id,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    total_month: req.body.total_month,
    fee: req.body.fee,
  })
    .then(async (data) => {
      try {
        const newData = await cTrainerData(req.params.t_id);
        // console.log(newData);
        return res.status(200).json({
          message: "Successfully Added Payment",
          trainer_data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while creating",
        error: err,
      });
    });
};


const deleteTrainerPayment = (req, res) => {
  console.log(req.params.tp_id);

  db.T_payment.findOne({
    where: {
      id: req.params.tp_id,
    },
  })
    .then(async (data) => {
      try {
        await db.T_payment.destroy({
          where: {
            id: req.params.tp_id,
          },
        });

        const newData = await cTrainerData(data.t_id);
        console.log(newData);
        return res.status(200).json({
          message: "Successfully Deleted Payment",
          trainer_data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while destroying",
        error: err,
      });
    });
};
const updateTrainerPayment = (req, res) => {
  // console.log(req.params.m_id );

  db.Trainer.update(
    {
      email: req.body.email,
      name: req.body.name,
      u_id: req.params.user_id,
      gender: req.body.gender,
      phone: req.body.phone,
      payment: req.body.payment,
      DOB: req.body.DOB,
    },
    {
      where: {
        id: req.params.t_id,
      },
    }
  )
    .then(async (data) => {
      try {
        const newData = await cTrainerData(req.params.t_id);

        return res.status(200).json({
          message: "success",
         trainer_data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while updating",
        error: err,
      });
    });
};

const allMemberData = async (req, res) => {
  cAllMemberData(req.params.user_id)
    .then((data) => {
      return res.status(200).json({
        message: "Success",
        member_data: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
        err: err,
      });
    });
};

const addMemberData = (req, res) => {
  console.log(req.file,280)
  // if(req.file){
   
  // }
  return res.status(200).json({
    message: "success",
    // member_data: newData,
  });
  db.Member.create({
    email: req.body.email,
    name: req.body.name,
    u_id: req.params.user_id,
    gender: req.body.gender,
    phone: req.body.phone,
    blood_group: req.body.blood_group,
    program: req.body.program,
    occupation: req.body.occupation,
    weight_kg: req.body.weight_kg,
    height_cm: req.body.height_cm,
    DOB: req.body.DOB,
    join_date:currentDate
  })
    .then(async (data) => {
      // console.log(data);
      try {
        const newData = await cAllMemberData(req.params.user_id);
        // console.log(newData);
        return res.status(200).json({
          message: "success",
          member_data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while creating",
        error: err,
      });
    });
};

const memberData = async (req, res) => {
  cMemberData(req.params.m_id)
    .then((data) => {
      return res.status(200).json({
        message: "Success",
        member_data: data,
      });
    })
    .catch(() => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};
const updateMemberData = (req, res) => {
  // console.log(req.params.m_id );

  db.Member.update(
    {
      email: req.body.email,
      name: req.body.name,
      gender: req.body.gender,
      phone: req.body.phone,
      blood_group: req.body.blood_group,
      program: req.body.program,
      occupation: req.body.occupation,
      weight_kg: req.body.weight_kg,
      height_cm: req.body.height_cm,
      DOB: req.body.DOB,
    },
    {
      where: {
        id: req.params.m_id,
      },
    }
  )
    .then(async (data) => {
      try {
        const newData = await cMemberData(req.params.m_id);

        return res.status(200).json({
          message: "success",
          member_data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while updating",
        error: err,
      });
    });
};

const addMemberPayment = (req, res) => {
  // console.log(req.body);

  db.M_payment.create({
    m_id: req.params.m_id,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    total_month: req.body.total_month,
    fee: req.body.fee,
  })
    .then(async (data) => {
      try {
        const newData = await cMemberData(req.params.m_id);
        console.log(newData);
        return res.status(200).json({
          message: "Successfully Added Payment",
          member_data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while creating",
        error: err,
      });
    });
};
const updateMemberPayment = (req, res) => {
  // console.log(req.body);

  db.M_payment.update(
    {
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      total_month: req.body.total_month,
      fee: req.body.fee,
    },
    {
      where: {
        id: req.params.mp_id,
      },
    }
  )
    .then(async (data) => {
      try {
        const m = await db.M_payment.findOne({
          where: {
            id: req.params.mp_id,
          },
        });
        const newData = await cMemberData(m.m_id);
        // console.log(newData);
        return res.status(200).json({
          message: "Successfully Updated Payment",
          member_data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while updating",
        error: err,
      });
    });
};

const deleteMemberPayment = (req, res) => {
  // console.log(req.body);

  db.M_payment.findOne({
    where: {
      id: req.params.mp_id,
    },
  })
    .then(async (data) => {
      try {
        await db.M_payment.destroy({
          where: {
            id: req.params.mp_id,
          },
        });

        const newData = await cMemberData(data.m_id);
        // console.log(newData);
        return res.status(200).json({
          message: "Successfully Deleted Payment",
          member_data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while destroying",
        error: err,
      });
    });
};

const allMemberAttendance = (req, res) => {
  cAllMemberAData(req.params.user_id)
    .then((data) => {
      return res.status(200).json({
        message: "Success",
        member_A_data: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
        err: err,
      });
    });
};
const MemberDateAttendance = (req, res) => {
  db.Member.findAll({
    where: { u_id: req.params.user_id },
    attributes: ["id", "name", "gender", "phone"],

    include: {
      model: db.Attendance,
      // as: 'M_payment',
      attributes: ["id", "date", "time"],
      where: {
        date: {
          [Op.eq]: req.body.date,
        },
      },
      // separate: true,
      // limit: 1,
      // order: [["createdAt", "DESC"]],
      // required: false,
    },
  })
    .then((data) => {
      return res.status(200).json({
        message: "Success",
        member_A_data: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
        err: err,
      });
    });
};
const addMemberAttendance = (req, res) => {
  // console.log(req.body);

  db.Attendance.findOne({
    where: {
      m_id: req.params.m_id,
      date: currentDate,
    },
  })
    .then(async (data) => {
      // console.log(data);
      try {
        if (data) {
          await db.Attendance.destroy({
            where: {
              m_id: req.params.m_id,
              date: currentDate,
            },
          });
        } else {
          await db.Attendance.create({
            m_id: req.params.m_id,
            date: currentDate,
            time: Time,
          });
        }
        const newData = await cMemberAData(req.params.m_id);
        return res.status(200).json({
          message: "Successfully Added Att",
          member_A_data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while adding att",
        error: err,
      });
    });
};

const deleteMember = (req, res) => {
  db.Member.destroy({
    where: {
      id: req.params.m_id,
    },
  })
    .then(async (data) => {
      try {
        const newData = await cAllMemberData(req.params.user_id);
        // console.log(newData);
        return res.status(200).json({
          message: "success",
          member_data: newData,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong while deleting",
        err: err,
      });
    });
};
module.exports = {
  allCountData,
  allTrainerData,
  addTrainerData,
  updateTrainerData,
  addMemberData,
  allMemberData,
  memberData,
  updateMemberData,
  addMemberPayment,
  updateMemberPayment,
  deleteMemberPayment,
  addMemberAttendance,
  allMemberAttendance,
  MemberDateAttendance,
  deleteMember,
  deleteTrainerData,
  TrainerData,
  updateTrainerPayment,
  deleteTrainerPayment,
  addTrainerPayment
};
