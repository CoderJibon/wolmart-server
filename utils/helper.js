// find public
const findPublicId = (url) => {
  const id = url.split("/")[url.split("/").length - 1].split(".")[0];
  return id;
};

module.exports = { findPublicId };
