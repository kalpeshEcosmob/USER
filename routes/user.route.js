const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const router = express.Router();

// get all users by pagination and sorting
router.get("/users", userController.getUsersData);

// get user by id and delete by id
router
  .route("/user/:user_id")
  .get(userController.getUserDataById)
  .delete(userController.deleteUserData);

// post a user
router.post(
  "/user",
  [
    body("firstname")
      .isString()
      .isLength({ min: 3, max: 15 })
      .trim()
      .withMessage("Minimum 3 charactor and maximum 15 allowed in first name"),
    body("lastname")
      .isString()
      .isLength({ min: 3, max: 15 })
      .trim()
      .withMessage("Minimum 3 charactor and maximum 15 allowed in last name"),
    body("gender")
      .isString()
      .isLength({ min: 1 })
      .trim()
      .matches(/^[MF]$/)
      .withMessage("Input entered in gender must be M or F"),
    body("mobile_no")
      .matches(/^\d{10}$/)
      .withMessage("Mobile number must be exactly 10 digits long"),
    body("status")
      .matches(/^[01]$/)
      .withMessage("Input entered in status should be 0 for false and 1 true "),
  ],
  userController.postUserData
);

// update a user
router.put(
  "/user",
  [
    body("firstname")
      .isString()
      .isLength({ min: 3, max: 15 })
      .trim()
      .withMessage("Minimum 3 charactor and maximum 15 allowed in first name"),
    body("lastname")
      .isString()
      .isLength({ min: 3, max: 15 })
      .trim()
      .withMessage("Minimum 3 charactor and maximum 15 allowed in last name"),
    body("gender")
      .isString()
      .isLength({ min: 1 })
      .trim()
      .matches(/^[MF]$/)
      .withMessage("Input entered in gender must be M or F"),
    body("mobile_no")
      .matches(/^\d{10}$/)
      .withMessage("Mobile number must be exactly 10 digits long"),
    body("status")
      .matches(/^[01]$/)
      .withMessage("Input entered in status should be 0 for false and 1 true "),
  ],
  userController.updateUserData
);

module.exports = router;
