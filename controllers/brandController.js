const createSlug = require("../utils/createSlug.js");
const Brand = require("../models/Brand.js");
const asyncHandler = require("express-async-handler");
const { cloudUpload, cloudDelete } = require("../utils/cloudinary.js");
const { findPublicId } = require("../utils/helper.js");

/**
 * @desc get all brand data
 * @route GET /brand
 * @access PUBLIC
 */

const getAllBrand = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  if (brands.length > 0) {
    return res.status(200).json(brands);
  }
  res.status(200).json([]);
});

/**
 * @desc create brand data
 * @route POST /brand
 * @access PUBLIC
 */
const createBrand = asyncHandler(async (req, res) => {
  // get values
  const { name } = req.body;
  console.log(req.body);
  // validations
  if (!name) {
    return res.status(400).json({ message: "brand name is required" });
  }
  // email check
  const nameCheck = await Brand.findOne({ name });

  if (nameCheck) {
    return res.status(400).json({ message: "Brand already exists" });
  }

  let photo = req?.file ? await cloudUpload(req?.file?.path) : null;

  // create new brand
  const brand = await Brand.create({
    name,
    slug: createSlug(name),
    photo: photo ? photo : null,
  });

  res.status(201).json({ brand, message: "brand created successfully" });
});

/**
 * @desc get Single Brand data
 * @route GET /brand/:id
 * @access PUBLIC
 */

const getSingleBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(400).json({ message: "No brand found" });
  }

  res.json(brand);
});

/**
 * @desc delete brand data
 * @route DELETE /brand/:id
 * @access PUBLIC
 */

const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    return res.status(400).json({ message: "Brand Already Delete" });
  }

  if (brand.photo) {
    const publicId = findPublicId(brand.photo);
    await cloudDelete(publicId);
  }

  res.json({ message: "Brand Delete Successful", brand });
});

/**
 * @desc update Permission data
 * @route PATCH /permission/:id
 * @access PUBLIC
 */

const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Brand Name Is required" });
  }

  const brand = await Brand.findById(id).exec();

  if (!brand) {
    return res.status(400).json({ message: "Brand not found" });
  }

  let updatePhoto = brand.photo;

  if (req?.file) {
    const photo = await cloudUpload(req);
    updatePhoto = photo;

    await cloudDelete(findPublicId(brand.photo));
  }

  const updateBrandData = await Brand.findByIdAndUpdate(
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
    message: `Brand updated successful`,
    brand: updateBrandData,
  });
});

/**
 * @desc update Brand Status
 * @route PUT /brand/status/:id
 * @access PUBLIC
 */

const updateBrandStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updateBrandStatus = await Brand.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `Brand updated successful`,
    brand: updateBrandStatus,
  });
});

module.exports = {
  getAllBrand,
  createBrand,
  getSingleBrand,
  deleteBrand,
  updateBrand,
  updateBrandStatus,
};
