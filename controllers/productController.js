const createSlug = require("../utils/createSlug.js");
const Product = require("../models/Product.js");
const asyncHandler = require("express-async-handler");
const {
  cloudUpload,
  cloudDelete,
  cloudUploads,
} = require("../utils/cloudinary.js");
const { findPublicId } = require("../utils/helper.js");

/**
 * @desc get all Product data
 * @route GET /Product
 * @access PUBLIC
 */

const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (products.length > 0) {
    return res.status(200).json(products);
  }
  res.status(200).json([]);
});

/**
 * @desc create Product data
 * @route POST /Product
 * @access PUBLIC
 */
const createProduct = asyncHandler(async (req, res) => {
  // get values
  const {
    name,
    productType,
    productSimple,
    productVariable,
    productGroup,
    productExternal,
    shortDesc,
    longDesc,
    specification,
  } = req.body;
  console.log(req.body);
  // validations
  if (!name) {
    return res.status(400).json({ message: "Product name is required" });
  }
  // email check
  const nameCheck = await Product.findOne({ name });

  if (nameCheck) {
    return res.status(400).json({ message: "Product already exists" });
  }

  //product image
  let productGallery = [];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const imageObj = await cloudUploads(req.files[i].path);
      productGallery.push(imageObj);
    }
  }

  let simpleProduct = JSON.parse(productSimple);

  // create new Product
  const product = await Product.create({
    name,
    slug: createSlug(name),
    productType,
    productSimple:
      productType === "simple" ? { ...simpleProduct, productGallery } : null,
    productVariable: productType === "variable" ? productVariable : null,
    productGroup: productType === "group" ? productGroup : null,
    productExternal: productType === "external" ? productExternal : null,
    shortDesc,
    longDesc,
    specification
  });

  res.status(201).json({ product, message: "Product created successfully" });
});

/**
 * @desc get Single Product data
 * @route GET /Product/:id
 * @access PUBLIC
 */

const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(400).json({ message: "No Product found" });
  }

  res.json(product);
});

/**
 * @desc delete Product data
 * @route DELETE /Product/:id
 * @access PUBLIC
 */

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(400).json({ message: "Product Already Delete" });
  }

  // if (product.photo) {
  //   const publicId = findPublicId(product.photo);
  //   await cloudDelete(publicId);
  // }

  res.json({ message: "Product Delete Successful", product });
});

/**
 * @desc update Permission data
 * @route PATCH /permission/:id
 * @access PUBLIC
 */

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Product Name Is required" });
  }

  const product = await Product.findById(id).exec();

  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }

  // let updatePhoto = product.photo;

  // if (req?.file) {
  //   const photo = await cloudUpload(req);
  //   updatePhoto = photo;

  //   await cloudDelete(findPublicId(Product.photo));
  // }

  const updateProductData = await Product.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
      photo: updatePhoto ? updatePhoto : null,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `Product updated successful`,
    product: updateProductData,
  });
});

/**
 * @desc update Product Status
 * @route PUT /Product/status/:id
 * @access PUBLIC
 */

const updateProductStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updateProductStatus = await Product.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `Product updated successful`,
    product: updateProductStatus,
  });
});

module.exports = {
  getAllProduct,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  updateProductStatus,
};
