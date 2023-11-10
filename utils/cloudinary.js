const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: "dj8foozva",
  api_key: "332787216499285",
  api_secret: "fmPaTdoJIDca2UZw9I2eQO-Pkas",
});

const cloudUpload = async (path) => {
  try {
    //file updated
    const data = await cloudinary.uploader.upload(path);

    //return file data
    return data ? data?.secure_url : null;
  } catch (error) {
    console.log(error.message);
  }
};
const cloudUploads = async (path) => {
  try {
    //file updated
    const data = await cloudinary.uploader.upload(path);

    //return file data
    return data ? { url: data?.secure_url, id: data.public_id } : null;
  } catch (error) {
    console.log(error.message);
  }
};

const cloudDelete = async (publicId) => {
  await await cloudinary.uploader.destroy(publicId);
};

// export cloud upload
module.exports = { cloudUpload, cloudDelete, cloudUploads };
