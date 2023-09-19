const key = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const adminTokenCheck = (req, res, next) => {

  if (!req.headers.authorization) {
    return res.status(404).send({
      message: "Provide Authentication Token",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  
  try {
    const decode = jwt.verify(token, key);
    if (decode.admin) {
      next();
    } else {
      res.status(403).send({
        message: "not admin token",
      });
    }
  } catch {
    res.status(401).send({
      message: "invalid Token or expired",
    });
  }
};

module.exports = adminTokenCheck;
