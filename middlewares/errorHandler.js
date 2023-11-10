/**
 * Custom error handler
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const errorMessage = error.message || "unknown Error";

  return res.status(statusCode).json({
    message: errorMessage,
    status: statusCode,
    stack: error?.stack,
  });
};

module.exports = errorHandler;
