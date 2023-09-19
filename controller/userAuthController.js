const key = process.env.SECRET_KEY;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../databases/connection");
const login = (req, res) => {
  db.User.findOne({
    where: { email: req.body.email },
    attributes: ["id", "name", "logo", "gym_name", "email", "phone","password"],
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          message: "Email not found",
        });
      }
      const passwordIsValid = await bcrypt.compare(
        req.body.password,
        data.dataValues.password
      );
    
      if (!passwordIsValid)
        return res.status(401).send({
          auth: false,
          token: null,
          message: "Password doesn't match",
        });
      const token = jwt.sign({ id: data.dataValues.id, admin: false }, key, {
        expiresIn: "2 days",
      });
      const {  password, ...rest } = data.dataValues;
      res.status(200).send({
        message: "Successful Login",
        data: rest,
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "something went wrong",
        err,
      });
    });
};

const register = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  //   res.send(hashedPassword);
  db.User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gym_name: req.body.gym_name,
    // gym_name: req.body.gym_name,
    password: hashedPassword,
  })
    .then((data) => {
      // console.log("success data", data.dataValues);
      const token = jwt.sign({ id: data.dataValues.id, admin: false }, key, {
        expiresIn: 300, // expires in 24 hours
      });
      return res.status(200).send({
        message: "success",
        data: {
          email: data.dataValues.email,
          name: data.dataValues.name,
          id: data.dataValues.id,
          phone: data.dataValues.phone,
          gym_name: data.dataValues.gym_name,
          logo: data.dataValues.logo,
        },
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "something went wrong",
        err,
      });
    });
};

module.exports = { login, register };
