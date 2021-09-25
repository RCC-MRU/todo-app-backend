require("dotenv").config();

const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

function generateToken(userID) {
  let data = {
    time: Date.now(),
    userId: userID,
  };

  const signToken = jwt.sign(data, jwtSecretKey, {
    expiresIn: "1h",
  });

  return signToken;
}

// jwt token varification
function jwtVerification(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      message: "Token not available",
    });
  }

  jwt.verify(token, jwtSecretKey, (err, result) => {
    if (err) throw err;
    console.log(result)
    req.tokenData = result;
    next();
  });
}

module.exports = {
  generateToken,
  jwtVerification,
};

