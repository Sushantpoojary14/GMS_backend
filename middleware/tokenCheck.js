const key = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const tokenCheck = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: "Provide Authentication Token",
    });
  }
  // console.log( jwt.verify(token, key));

  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log( token, key);
    const decode = jwt.verify(token, key);
    if (!decode.admin) {
      next();
    } else {
      res.status(403).send({
        message: "not user token",
      });
    }
  } catch {
    res.status(401).send({
      message: "invalid Token or expired",
    });
  }
};

module.exports = tokenCheck;
