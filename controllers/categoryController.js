const createSlug = require("../utils/createSlug.js");
const Category = require("../models/Category.js");
const asyncHandler = require("express-async-handler");
const { cloudUpload, cloudDelete } = require("../utils/cloudinary.js");
const { findPublicId } = require("../utils/helper.js");

/**
 * @desc get all Category data
 * @route GET /category
 * @access PUBLIC
 */

const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find().populate([
    {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
        },
      },
    },
    {
      path: "subCategory",
      populate: {
        path: "subCategory",
        populate: {
          path: "subCategory",
        },
      },
    },
  ]);

  if (categories.length > 0) {
    return res.status(200).json(categories);
  }
  res.status(200).json([]);
});

/**
 * @desc create Category data
 * @route POST /category
 * @access PUBLIC
 */

const createCategory = asyncHandler(async (req, res) => {
  // get values
  const { name, parentCategory, icon } = req.body;

  // validations
  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }
  // email check
  const nameCheck = await Category.findOne({ name });

  if (nameCheck) {
    return res.status(400).json({ message: "Category already exists" });
  }

  let photo = req?.file ? await cloudUpload(req?.file.path) : null;

  // create new brand
  const category = await Category.create({
    name,
    slug: createSlug(name),
    parentCategory: parentCategory ? parentCategory : null,
    photo: photo ? photo : null,
    icon: icon ? icon : null,
  });

  if (parentCategory) {
    await Category.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: category._id },
    });
  }

  res.status(200).json({ category, message: "Category created successfully" });
});

/**
 * @desc get Single Category data
 * @route GET /category/:id
 * @access PUBLIC
 */

const getSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return res.status(400).json({ message: "No Category found" });
  }

  res.json(category);
});

/**
 * @desc delete Category data
 * @route DELETE /category/:id
 * @access PUBLIC
 */

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return res.status(400).json({ message: "Category delete failed" });
  }

  if (category.photo) {
    const publicId = findPublicId(category.photo);
    await cloudDelete(publicId);
  }

  res.json({ message: "Category Delete Successful", category });
});

/**
 * @desc update Category data
 * @route PATCH /category/:id
 * @access PUBLIC
 */

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, parentCategory, icon } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Category Name Is required" });
  }

  const category = await Category.findById(id).exec();

  if (!category) {
    return res.status(400).json({ message: "Category not found" });
  }

  let updatePhoto = category.photo;

  if (req?.file) {
    const photo = await cloudUpload(req);
    updatePhoto = photo;

    await cloudDelete(findPublicId(category.photo));
  }

  const updateCategoryData = await Category.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
      parentCategory: parentCategory ? parentCategory : null,
      photo: updatePhoto ? updatePhoto : null,
      icon: icon ? icon : null,
    },
    {
      new: true,
    }
  );

  if (parentCategory) {
    await Category.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: updateCategoryData._id },
    });
  }

  res.json({
    message: `Category updated successful`,
    category: updateCategoryData,
  });
});

/**
 * @desc update Category Status
 * @route PUT /category/status/:id
 * @access PUBLIC
 */

const updateCategoryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updateCategoryStatus = await Category.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `Category Status updated successful`,
    category: updateCategoryStatus,
  });
});

module.exports = {
  getAllCategory,
  createCategory,
  getSingleCategory,
  deleteCategory,
  updateCategory,
  updateCategoryStatus,
};
