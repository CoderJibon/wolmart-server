const multer = require("multer");

// Multer memory storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.fieldname
    );
  },
});

// Define multer instances as functions
const brandPhoto = () => multer({ storage: storage }).single("brandPhoto");
const categoryPhoto = () =>
  multer({ storage: storage }).single("categoryPhoto");
const productPhoto = () => multer({ storage: storage }).array("productPhoto");

// Export the functions
module.exports = { brandPhoto, categoryPhoto, productPhoto };
