const Silder = require("../model/silderModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("../utils/cloudinary");

// *************** filterSilders
const filterProducts = async (req, res) => {
  console.log(req.body);
  try {
    const { brand, categoryfind } = req.body;
    let args = {};
    if (brand.length > 0) args.brand = brand;
    if (categoryfind.length > 0) args.category = categoryfind;
    console.log("args.category=" + args.category);
    const products = await Product.find(args);
    console.log("products=" + products);
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

// ************ Create Silders
const createSilders = async (req, res) => {
  const { title, desc,  cover } = req.body;
  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "silder",
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

  console.log("fileData");
  const silder = await Silder.create({
    title,
    desc,
    cover: fileData,
    cloudinary_id: fileData.cloudinary_id,
  });
  console.log(silder);
  res.status(201).json(silder);
};


const getSilders = async (req, res) => {
  console.log(req.body);
  const silders = await Silder.find(req.body).sort("-createdAt");
  res.status(200).json(silders);
};


const getSilder = async (req, res) => {
  // console.log(req.params.id);
  const silder = await Silder.findById(req.params.id)
  if (!silder) {
    res.status(404);
    throw new Error("silder not found");
  }
  res.status(200).json(silder);
};




// ************ Delete Silders
const deleteSilder = async (req, res) => {

  const silder= await Silder.findById(req.params.id);
  if (!silder) {
    res.status(404);
    throw new Error("silder not found");
  }

  await cloudinary.uploader.destroy(silder.cloudinary_id, {
    upload_preset: "PinventApp",
  });
  await silder.remove();
  res.status(200).json({ message: "silder deleted." });
};

// ************ Update Silders
const updateSilder= async (req, res) => {
  const { title, desc, cloudinary_id, cover } = req.body;
  const { id } = req.params;
  const updatesilder = await Silder.findById(id);
  console.log(updatesilder);
  if (!updatesilder) {
    res.status(404);
    throw new Error("updatesilder not found");
  }
  // ************ Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "silder",
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
  const updatedSilders = await Silder.findByIdAndUpdate(
    { _id: id },
    {
      title,
      desc,
      cloudinary_id,
      cover: Object.keys(fileData).length === 0 ? Silders?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedSilders);
};

module.exports = {
  createSilders,
  getSilders,
  getSilder,
  deleteSilder,
  updateSilder,
  filterProducts,
};
