const express = require("express");
const {
  register,
  login,
  logout,
  updateProfile,
} = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

// router.route("/register").post(register);
// router.route("/login ").post(login);
// router.route("/profile/update ").post(isAuthenticated, updateProfile);

router.post("/register", register);
router.post("/login", login);
// router.post("/updateprofile", updateProfile);
router.post("/logout", logout);

module.exports = router;
