const router = require("express").Router();
const {
  isLoggedIn,
  login,
  logout,
  register,
} = require("../controllers/auth.js");

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/is_logged_in", isLoggedIn);

module.exports = router;
