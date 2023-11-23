const db = require("../databases/connection");
const bcrypt = require("bcryptjs");
const { Op } = require("@sequelize/core");

const path = require("path");
const userAllData = (req, res) => {
  db.User.findAll({
    attributes: ["id", "name", "logo", "gym_name", "email", "phone"],
  })
    .then((data) => {
      if (data.length == 0)
        return res.status(404).json({
          message: "No data found",
        });

      return res.status(200).json({
        message: "All user data",
        user_data: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};
const addUserData = (req, res) => {
  // console.log(req.body);
  db.User.findOne({ where: { email: req.body.email } })
    .then((data) => {
      if (data)
        return res.status(403).send({
          message: "Email Already Used",
        });

      // console.log(req.body);
      // const file = req.files.upload;

      // const filePath = path.join(__dirname, "public", "images", `${file.name}`);
      // file.mv(filePath, (err) => {
      //   if (err) return res.status(500).send(err);
      // });
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      db.User.create({
        email: req.body.email,
        name: req.body.name,
        gym_name: req.body.gym_name,
        phone: req.body.phone,
        password: hashedPassword,
        // logo: filePath,
      })
        .then(async (data) => {
          console.log(data);
          const newData = await db.User.findAll({
            attributes: ["id", "name", "logo", "gym_name", "email", "phone"],
          });
          return res.status(200).json({
            message: "success",
            user_data: newData,
          });

          // return res.status(200).json({
          //   message: "All user data",
          //   user_data: data,
          // });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "something went wrong while creating",
            error: err,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while find",
        error: err,
      });
    });
};
const userCountData = async (req, res) => {
  const user = await db.User.findAndCountAll();
  const members = await db.Member.findAndCountAll();
  //  console.log(user);
  return res.status(200).json({
    message: "All data count",
    user_data: user.count,
    member_data: members.count,
  });
};

const updateUserData = (req, res) => {
  // console.log(req.body);
  db.User.findOne({
    where: {
      email: req.body.email,
      id: {
        [Op.not]: req.params.user_id,
      },
    },
  })
    .then((data) => {
      if (data)
        return res.status(403).send({
          message: "Email Already Used",
        });

      // console.log(req.body);
      // const file = req.files.upload;

      // const filePath = path.join(__dirname, "public", "images", `${file.name}`);
      // file.mv(filePath, (err) => {
      //   if (err) return res.status(500).send(err);
      // });

      const hashedPassword =
        req.body.password && bcrypt.hashSync(req.body.password, 8);

      db.User.update(
        {
          email: req.body.email,
          name: req.body.name,
          gym_name: req.body.gym_name,
          phone: req.body.phone,
          password: hashedPassword,
          // logo: filePath,
        },
        {
          where: {
            id: req.params.user_id,
          },
        }
      )
        .then(async (data) => {
          // console.log(data);
          const newData = await db.User.findOne({
            where: {
              id: req.params.user_id,
              attributes: ["id", "name", "logo", "gym_name", "email", "phone"],
            },
          });
          return res.status(200).json({
            message: "success",
            user_data: newData,
          });

          // return res.status(200).json({
          //   message: "All user data",
          //   user_data: data,
          // });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "something went wrong while updating",
            error: err,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong while find",
        error: err,
      });
    });
};

const deleteUser = (req, res) => {
  // console.log(168,newData);
  db.User.destroy({
    where: {
      id: req.params.user_id,
    },
  })
    .then(async (data) => {
      try {
        const newData = await db.User.findAll({
          attributes: ["id", "name", "logo", "gym_name", "email", "phone"],
        });
        // console.log(newData);
        return res.status(200).json({
          message: "success",
          user_data: newData,
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
  deleteUser,
  userAllData,
  addUserData,
  userCountData,
  updateUserData,
};
