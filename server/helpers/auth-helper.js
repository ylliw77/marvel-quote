const { sign, verify } = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

function createToken(payload) {
  return sign(payload, SECRET);
}

function verifyToken(access_token) {
  return verify(access_token, SECRET);
}

module.exports = { createToken, verifyToken };
