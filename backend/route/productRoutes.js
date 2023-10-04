const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, getProductDetails, updateProducts, deleteProduct, createProductReview, deleteReviews, getProductReviews } = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("Admin"),createProduct);

router.route("/products").get(getAllProducts);

router.route("/product/:id").get(getProductDetails);

router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("Admin"),updateProducts).delete(isAuthenticatedUser,authorizeRoles("Admin"),deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview)

router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser,deleteReviews)





module.exports = router;
