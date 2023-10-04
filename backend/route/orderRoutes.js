const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { createOrder, getSingleOrder, myOrders, getAllOrders, deleteOrder } = require("../controller/orderController");
const router = express.Router();


router.route("/order/new").post(isAuthenticatedUser,createOrder);

router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser,myOrders);

router.route("/order/admin/all").get(isAuthenticatedUser,authorizeRoles("Admin"),getAllOrders);

router.route("/order/:id").delete(isAuthenticatedUser,authorizeRoles("Admin"),deleteOrder);




module.exports = router;