const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.get("/page", userController.getUserDataPage);
router.get("/sort", userController.getUserDataSort);

router
  .route("/user/:user_id")
  .get(userController.getUserData)
  .delete(userController.deleteUserData);

router.post(
  "/user",
  [
    body("firstname").isString().isLength({ min: 3 }).trim(),
    body("lastname").isString().isLength({ min: 3 }).trim(),
    body("mobile_no").isString().isLength({ min: 10 }).trim(),
  ],
  userController.postUserData
);

router
  .route("/user")
  // .post(userController.postUserData)
  .put(userController.updateUserData);

module.exports = router;
