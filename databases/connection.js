const {Sequelize,DataTypes} = require('sequelize');
require('dotenv').config();
const bcrypt = require("bcryptjs");
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  }

  // async () => {
  // }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("../models/user")(sequelize,DataTypes);
db.Admin = require("../models/admin")(sequelize,DataTypes);
db.Member = require("../models/member")(sequelize,DataTypes);
db.Trainer = require("../models/trainer")(sequelize,DataTypes);
db.M_payment = require("../models/m_payment")(sequelize,DataTypes);
db.T_payment = require("../models/t_payment")(sequelize,DataTypes);
db.Attendance = require("../models/attendance")(sequelize,DataTypes);
db.M_PT = require("../models/m_PT")(sequelize,DataTypes);

db.sequelize
.sync()
// .sync({ force: true })
  .then((data) => {
    const hashedPassword = bcrypt.hashSync("12345678", 8);
    db.Admin.create({
      email:"admin@admin",
      password:hashedPassword
    });
    db.User.create({
      email:"user@user",
      password:hashedPassword
    });
    console.log("successful sync");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
