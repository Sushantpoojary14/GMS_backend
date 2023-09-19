const key = process.env.SECRET_KEY;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../databases/connection");
const adminLogin = (req, res) => {
  // console.log("email "+req.body.email );
  db.Admin.findOne({ where: { email: req.body.email } })
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
      //  console.log(passwordIsValid);
      if (!passwordIsValid)
        return res
          .status(401)
          .send({
            auth: false,
            token: null,
            message: "Password doesn't match",
          });
      const token = jwt.sign({ id: data.dataValues.id, admin: true }, key, {
        expiresIn: "2 days",
      });
      res.status(200).send({
        message: "Successful Login",
        data: {
          email: data.dataValues.email,
          name: data.dataValues.name,
          id: data.dataValues.id,
        },
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "something went wrong",
      });
    });
};
const adminLogout= (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  // jwt.sign;
}
module.exports = { adminLogin,adminLogout  };
