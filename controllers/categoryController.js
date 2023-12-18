// const  = require("express-async-handler");
const Category = require("../model/categoryModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
// const cloudinary = require("cloudinary").v2;
const cloudinary = require("../utils/cloudinary");

// Create Prouct
const createCategory = async (req, res) => {
  const { name} = req.body;
  console.log(req.body);
  //   Validation
  if (!name) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "category",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }
    //  console.log(uploadedFile )
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
      cloudinary_id: uploadedFile.public_id,
    };
  }
  // console.log(fileData);
  const categorycreate = await Category.create({
    name,
    image: fileData,
    cloudinary_id: fileData.cloudinary_id,
  });
  console.log(categorycreate);
  res.status(201).json(categorycreate);
};

// ********************** Get all Products
const getCategorys = async (req, res) => {
  const categorys = await Category.find().sort("-createdAt");
  res.status(200).json(categorys);
};

// Get single product
const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  // if product doesnt exist
  if (!category) {
    res.status(404);
    throw new Error("Product not found");
  }
  console.log(category);
  res.status(200).json(category);
};

// Delete Category
const deleteCategory = async (req, res) => {
  console.log(req.params.id)
  const category = await Category.findById(req.params.id);
  // if category doesnt exist
  if (!category) {
    res.status(404);
    throw new Error("category not found");
  }
  await category.remove();
  res.status(200).json({ message: "category deleted" });
};

// ********************** update category
const updateCategory = async (req, res) => {
  const { name, image } = req.body;
  const { id } = req.params;
  console.log("req.body"+req.body.name)
  console.log("req.body"+id)
  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Product
  const updatedCategory = await Category.findByIdAndUpdate(
    { _id: id },
    {
      name,
      image: Object.keys(fileData).length === 0 ? category?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );
// console.log(updatedCategory)
  res.status(200).json(updatedCategory);
};

module.exports = {
  createCategory,
  getCategorys,
  getCategory,
  deleteCategory,
  updateCategory,
};
