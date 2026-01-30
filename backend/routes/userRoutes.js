const express = require("express");
const router = express.Router();
const {
    loginUser,
    registerUser,
    logoutUser,
    getUserData,
    forgotPassword,
    resetPassword,
} = require("../controller/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(isAuthenticatedUser, forgotPassword);
router.route("/password/reset/:token").put(isAuthenticatedUser, resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserData);

module.exports = router;