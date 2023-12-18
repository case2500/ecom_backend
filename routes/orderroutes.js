const express = require("express");
const router = express.Router();
const {
    createOrder,
    getOrders ,
    getOrder,
    updateOrder,
    changestatus,
    updateOrderAdmin,
    updateshipping,
    updateCompany
} = require("../controllers/ordercontroller");

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

router.post("/create",auth, createOrder);
router.get("/getOrders", getOrders );
router.get("/getOrder/:id",auth, getOrder );

router.post("/updateorder",auth, updateOrderAdmin);

router.post("/updateship",auth,adminCheck, updateshipping);
router.post("/updateordercompany",auth,adminCheck, updateCompany);
router.put('/:id',auth, updateOrder)


module.exports = router;
