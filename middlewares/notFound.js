/**
 * @message 404 Not Found
 */
const notFound = (req, res, next) => {
  return res
    .status(404)
    .json({ message: "Sorry, the requested resource was not found." });
};

module.exports = notFound;
