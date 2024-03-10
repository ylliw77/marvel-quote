function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal server error";
  console.log(err);
  if (err.name === "USER_NOT_FOUND") {
    status = 401;
    message = err.message;
  } else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "JsonWebTokenError") {
    staus = 401;
    message = "Login required";
  } else if (err.name === "NOT_FOUND") {
    status = 404;
    message = err.message;
  } else if(err.name === "UNAUTHORIZED"){
    status = 401
    message = 'Login required'
  }
  res.status(status).json({ message });
}

module.exports = errorHandler;
