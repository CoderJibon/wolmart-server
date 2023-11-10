const mongoose = require("mongoose");

// create Product schema

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    productType: {
      type: String,
      enum: ["simple", "variable", "group", "external"],
      default: "simple",
    },
    productSimple: {
      regularPrice: {
        type: Number,
      },
      salePrice: {
        type: Number,
        default: 0,
      },
      sku: {
        type: String,
        trim: true,
      },
      productThumbnail: {
        type: String,
        trim: true,
      },
      productGallery: [
        {
          url: {
            type: String,
            trim: true,
          },
          id: {
            type: String,
            trim: true,
          },
        },
      ],
      stock: {
        type: Number,
        trim: true,
        default: 0,
      },
    },
    productVariable: [
      {
        size: {
          type: String,
          default: null,
        },
        color: {
          type: String,
          default: null,
        },
        regularPrice: {
          type: Number,
        },
        salePrice: {
          type: Number,
          default: 0,
        },
        sku: {
          type: String,
          trim: true,
        },
        productThumbnail: {
          type: String,
          trim: true,
        },
        productGallery: [
          {
            type: String,
            trim: true,
          },
        ],
        stock: {
          type: Number,
          trim: true,
          default: 0,
        },
      },
    ],
    productGroup: [
      {
        productName: {
          type: String,
        },
        regularPrice: {
          type: Number,
        },
        salePrice: {
          type: Number,
          default: 0,
        },
        sku: {
          type: String,
          trim: true,
        },
        productThumbnail: {
          type: String,
          trim: true,
        },
        productGallery: [
          {
            type: String,
            trim: true,
          },
        ],
        stock: {
          type: Number,
          trim: true,
          default: 0,
        },
      },
    ],
    productExternal: {
      regularPrice: {
        type: Number,
      },
      salePrice: {
        type: Number,
        default: 0,
      },
      sku: {
        type: String,
        trim: true,
      },
      productThumbnail: {
        type: String,
        trim: true,
      },
      productGallery: [
        {
          type: String,
          trim: true,
        },
      ],
      stock: {
        type: Number,
        trim: true,
        default: 0,
      },
      productLink: {
        type: String,
        trim: true,
      },
    },
    shortDesc: {
      type: String,
      trim: true,
    },
    longDesc: {
      type: String,
      trim: true,
    },
    specification: {
      type: String,
      trim: true,
    },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Reviews",
      default: null,
    },
    category: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
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

// export Product schema

module.exports = mongoose.model("Product", ProductSchema);
