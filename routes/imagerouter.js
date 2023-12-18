const express = require("express");
const router = express.Router();

// controllers
const { createImage, removeImage } = require("../controllers/cloudinary.js");
const {upload} = require('../helpers/filehelper.js');

const {multipleFileUpload,} = require('../controllers/fileuploaderController.js')
// middleware
// const { auth, adminCheck } = require("../middleware/auth");

//@Endpoint     http://localhost:5000/api/images
router.post("/",  createImage);
router.post("/removeimages",  removeImage);
// multipleFiles
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
module.exports = router;

