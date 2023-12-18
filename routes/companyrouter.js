const express = require("express");

const router = express.Router();
// const {
//   verifyToken,
//   refreshToken,
// } = require("../controllers/usercontroller");
const {
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  getSingleCompany,
} = require("../controllers/companyController.js");
const { upload } = require("../utils/fileUpload");
const { auth, adminCheck } = require("../middleware/auth.js");

router.get("/", getCompany);
router.get("/single/:id", getSingleCompany);
router.post("/", upload.single("image"), createCompany);
router.patch("/:id", upload.single("image"), updateCompany);
router.delete("/:id",  deleteCompany);
module.exports = router;
