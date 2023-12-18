const Product = require("../model/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("../utils/cloudinary");
const directoryPath = "uploads";
const fs = require("fs");
const path = require("path");
// *************** filterProducts
const filterProducts = async (req, res) => {
  console.log(req.body);
  try {
    const { brand, categoryfind } = req.body;
    let args = {};
    if (brand.length > 0) args.brand = brand;
    if (categoryfind.length > 0) args.category = categoryfind;
    console.log("args.category=" + args.category);
    const products = await Product.find(args);
    console.log("products=" + JSON.stringify(args));
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

// ************ Create Prouct
const createProduct = async (req, res) => {
  console.log(req.body);
  let filesArray = [];
  //  console.log(req.files)
  const { name, price, quantity, discount, brand, category, description } = req.body;
  // let filesArray = [];
  // console.log(req.files);
  req.files.forEach((element,index) => {
    const file = {
      _id:(index),
      fileName: element.filename,
      filePath: element.path,
      fileType: element.mimetype,
      fileSize: fileSizeFormatter(element.size, 2),
    };
    filesArray.push(file);
  });
  console.log(JSON.stringify(filesArray));

  // // console.log(JSON.stringify(req.file.filename));
  // // console.log(JSON.stringify(req.body));
  // //   Validation
  // if (!name || !category || !quantity || !price) {
  //   res.status(400);
  //   throw new Error("Please fill in all fields");
  // }

  const product = await Product.create({
    // user: req.user.id,
    name,
    price,
    quantity,
    discount,
    brand,
    category:"case",
    description,
    images: filesArray,
  });
  // // console.log(product);
  res.status(201).json(product);
};

// ************ Get all Products
const getProducts = async (req, res) => {
  console.log(req.body);
  const products = await Product.find(req.body)
    // .populate("category", "name")
    .sort("-createdAt");
  res.status(200).json(products);
};

// ************ Get single product
const getProduct = async (req, res) => {
  console.log(req.params.id);
  const product = await Product.findById(req.params.id);
  //  .populate("category", "name");
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  console.log("product=" + product);
  res.status(200).json(product);
};

// ************ Get category product
const getProductCategory = async (req, res) => {
  const query = req.params.query;
  console.log("query=> " + query);
  const products = await Product.find({ category: query })
    // .populate("category", "name")
    .sort("-createdAt");
  console.log("products=> " + products);
  res.status(200).json(products);
};

// ************ คันหาproduct ชื่อกับcategoryคล้ายกับ (req.params)
const getProductSearch = async (req, res) => {
  // console.log(req.params.keyword);
  const con = req.params.keyword;
  const query = {
    $or: [
      { category: { $regex: "(?i)" + `${con}` + "(?-i)" } },
      { name: { $regex: "(?i)" + `${con}` + "(?-i)" } },
    ],
  };
  // console.log(query);
  const products = await Product.find(query).sort("-createdAt");
  // console.log(products);
  res.status(200).json(products);
};

// ************ Delete Product
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
   console.log(JSON.stringify(product));
  let cloundid = [];
  if (!product) {
     res.status(404);
     return;
    // throw new Error("Product not found");
   
  }
  for (let i = 0; i < product.images.length; i++) {
    console.log("http://localhost:4000/"+directoryPath +"/"+ product.images[i].fileName);
    fs.unlink( directoryPath +"/"+ product.images[i].fileName, function (err) {
      if (err) {
        //  console.error(err.toString());
        res.status(404).json({ msg: "error" });
      } else {
         console.warn(product.images[i].fileName, +" deleted");
      // res.status(200).json({ msg: "sucess" });
      }
    });
    // cloudinary.uploader.destroy(product.images[i].public_id, (result) => {
    //   console.log(product.images[i].public_id);
    // });
  }
  await product.remove();
  res.status(200).json({ message: "Product deleted." });
};

// ************ Update Product
const updateProduct = async (req, res) => {
  console.log("req.body=")+req.body;
  console.log( req.files)
  const {
    name,
    category,
    brand,
    discount,
    quantity,
    price,
    description,
    // images,
  } = req.body;
  // console.log("req.body" + JSON.stringify(req.body));
  const { id } = req.params;
  const product = await Product.findById(id);
  // console.log(product);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      brand,
      quantity,
      price,
      discount,
      description,
      // images: images,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductCategory,
  getProductSearch,
  filterProducts,
};
