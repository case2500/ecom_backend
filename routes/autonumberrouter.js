const express = require("express");
const router = express.Router();
const {
    updateauto,
    getauto,
    createAutonumber
} = require("../controllers/autocontroller.js");

const {
  verifyToken,
  refreshToken,
} = require("../controllers/usercontroller");
const { auth,adminCheck } = require("../middleware/auth.js");
// ******* http://localhost:5000/api/order/create ******** //
// ******* http://localhost:5000/api/order/getOrders ******** //
// ******* http://localhost:5000/api/user ******** //
// ******* http://localhost:5000/api/logout ******** //
//********http://localhost:5000/api/order/getOrder/645628d22988e62b57303be2 */
//updateOrderAdmin


router.get("/", getauto );
router.post("/", updateauto);
router.post("/create", createAutonumber);



module.exports = router;
