const fs = require("fs");
const path = require("path");
const MultipleFile = require("../model/multiplefile");

//deleteFileUpload
const deleteFileUpload = async (req, res, next) => {
  const postId = req.params.id;

  // const {name} = req.body
  console.log(postId);
  const files = await MultipleFile.find({ _id: postId });
  const filedel = files[0].files[0].filePath;
  // res.status(200).send(files[0].files);
  await MultipleFile.deleteOne({_id:postId});
  try {
    
    fs.unlinkSync(filedel);
    console.log("Delete File successfully.");
    res.status(201).send("Delete File successfully");
  } catch (error) {
    console.log(error);
  }
};

const multipleFileUpload = async (req, res, next) => {
  console.log(req.files);
  try {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      };
      filesArray.push(file);
    });
    const multipleFiles = new MultipleFile({
      title: req.body.title,
      files: filesArray,
    });
    // await multipleFiles.save();
    res.status(201).send("Files Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getallMultipleFiles = async (req, res, next) => {
  try {
    const files = await MultipleFile.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = {
  deleteFileUpload,
  multipleFileUpload,
  getallMultipleFiles,
};
