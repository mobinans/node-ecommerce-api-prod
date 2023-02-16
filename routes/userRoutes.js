const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizPermission,
} = require("../middleware/authentication");

const {
  getallUsers,
  getSingleUser,
  showCurrentUsers,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router
  .route("/")
  .get(authenticateUser, authorizPermission("admin"), getallUsers);

router.route("/showMe").get(authenticateUser, showCurrentUsers);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
