const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategorys,
  getCategory,
  deleteCategory,
updateCategory
} = require("../controllers/categoryController.js");
const { upload } = require("../utils/fileUpload");

const {
  verifyToken,
  refreshToken,
} = require("../controllers/usercontroller");


const { auth,adminCheck } = require("../middleware/auth.js");

router.post("/",upload.single("image"),  createCategory);
router.patch("/:id",  upload.single("image"),updateCategory);
router.get("/", getCategorys);
router.get("/:id", getCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
