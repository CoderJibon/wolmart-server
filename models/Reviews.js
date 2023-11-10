const mongoose = require("mongoose");

// create Reviews schema

const ReviewsSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      trim: true,
      default: 0,
    },
    review: {
      type: String,
      trim: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// export Reviews schema

module.exports = mongoose.model("Reviews", ReviewsSchema);
