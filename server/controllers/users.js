const User = require("../models/User.js");

// get the user with id
exports.getUserInfo = async (req, res, next) => {
  try {
    const data = await User.findById(req.user.id).select("name email");
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
