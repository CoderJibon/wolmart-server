const mongoose = require("mongoose");

//user Schema
const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    permissions: {
      type: Array,
      default: [],
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//export user Schema
module.exports = mongoose.model("Role", roleSchema);
