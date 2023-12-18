const Company = require("../model/companyModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("../utils/cloudinary");

const deleteCompany = async (req, res) => {
  const { id } = req.params;
  const company = await Company.findById(req.params.id);
  if (!company) {
    res.status(404);
    throw new Error("company not found");
  }
  // await cloudinary.uploader.destroy(company.cloudinary_id, {
  //   upload_preset: "PinventApp",
  // });
  await Company.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "category deleted" });
  // await company.remove();
  // res.status(200).json({ message: "company deleted." });
};

// ************ Create Prouct
const createCompany = async (req, res) => {
  const { name, address, phone, description } = req.body;
  const company = await Company.create({
    name,
    address,
    phone,
    description,
  });
  res.status(201).json(company);
};

// ************ Get all company
const getCompany = async (req, res) => {
  console.log(req.body);
  const company = await Company.find(req.body)
    // .populate("category", "name")
    .sort("-createdAt");
  res.status(200).json(company);
};

// ************ Update company
const updateCompany = async (req, res) => {
  const { name, address, phone, description } = req.body;
  const { id } = req.params;
  const company = await Company.findById(id);
  if (!company) {
    res.status(404);
    throw new Error("company not found");
  }
  console.log(req.body);
  const updatedCompany = await Company.findByIdAndUpdate(
    { _id: id },
    {
      name,
      address,
      phone,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedCompany);
};

// ************ Get all company
const getSingleCompany = async (req, res) => {
  console.log(req.params.id);
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json(company);
  } catch (error) {
    res.status(404).json({ msg: "company not found" });
  }
};

module.exports = {
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  getSingleCompany,
};
