const { verifyToken } = require("../helpers/auth-helper");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization;
    if (!access_token) {
      throw {
        name: "UNAUTHORIZED",
      };
    }
    const { id } = verifyToken(access_token.replace("Bearer ", ""));
    let user = await User.findByPk(id);
    if (!user) {
      throw {
        name: "UNAUTHORIZED",
      };
    }
    req.user = user;
    next()
  } catch (err) {
    next(err);
  }
};


module.exports = authentication