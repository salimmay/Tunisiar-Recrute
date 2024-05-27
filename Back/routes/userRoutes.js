const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  setUser,
  getRole,
  loginUser,
  getEmail,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.route("/auth").get(auth);
router.route("/").get(getUsers);
router.route("/role/:role").get(getRole);
router.route("/user/:id").put(updateUser).delete(deleteUser).get(getUser);
router.route("/email/:email").get(getEmail);
router.route("/signup").post(setUser);
router.route("/login").post(loginUser);

module.exports = router;
