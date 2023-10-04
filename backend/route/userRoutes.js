const express = require("express");
const { registerUser, loginUser, logOut, getUser } = require("../controller/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logOut);

router.route("/me").get(isAuthenticatedUser, getUser);

module.exports = router;