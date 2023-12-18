const express = require("express");

const router = express.Router();
// const {
//   verifyToken,
//   refreshToken,
// } = require("../controllers/usercontroller");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductCategory,
  getProductSearch,
  filterProducts
} = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");
const { auth,adminCheck } = require("../middleware/auth.js");

router.get("/", getProducts);
router.get("/:id", getProduct);

// router.post("/",upload.single("image"), createProduct);


router.post("/",upload.single("image"), (req,res)=>{
  console.log("filename="+req.file.filename)
  console.log("body="+req.body)

});
// router.post("/",upload.single("image"), createProduct);
router.patch("/:id",  upload.single("image"), updateProduct);

router.delete("/:id", deleteProduct);

router.get("/category/:query", getProductCategory);
router.get("/productsearch/:keyword", getProductSearch);
router.post('/filterproduct',filterProducts)







module.exports = router;
