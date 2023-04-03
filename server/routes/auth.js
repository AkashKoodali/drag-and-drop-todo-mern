const router = require("express").Router();
const {
  isLoggedIn,
  login,
  logout,
  register,
} = require("../controllers/auth.js");

// login route
router.post("/login", login);

// register route
router.post("/register", register);

// logout route
router.get("/logout", logout);

// check the auth status
router.get("/is_logged_in", isLoggedIn);

module.exports = router;
