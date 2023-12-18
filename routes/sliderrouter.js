const express = require("express");

const router = express.Router();
const {
  createSilders,
  getSilders,
  getSilder,
  deleteSilder,
  updateSilder

} = require("../controllers/silderController.js");
const { upload } = require("../utils/fileUpload.js");
const { auth,adminCheck } = require("../middleware/auth.js");

router.get("/", getSilders);
router.get("/:id", getSilder);
router.post("/", upload.single("image"),createSilders);
router.patch("/:id",  updateSilder);
router.delete("/:id", deleteSilder);

// router.get("/", protect, getProducts);
// router.get("/:id", protect, getProduct);






module.exports = router;
