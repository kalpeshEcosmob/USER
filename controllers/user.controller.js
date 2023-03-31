const sql = require("../database/database").sql;
const { validationResult } = require("express-validator");

const getUserData = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const query = `SELECT * FROM users where user_id = "${user_id}"`;
    sql.query(query, (err, data) => {
      if (!err) res.status(200).json({ Response: data });
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({ Response: error.message });
  }
};

const postUserData = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("errorooroooo", errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      user_id,
      firstname,
      lastname,
      date_of_birth,
      mobile_no,
      gender,
      address,
      status,
    } = req.body;

    //....checking character length
    if (
      firstname.length > 15 ||
      firstname.length < 1 ||
      lastname.length > 15 ||
      lastname.length < 1
    )
      return res.json({
        Response:
          "Characters entered in firstname and lastname must be greater than 2 and less than 15",
      });

    if (mobile_no.toString().length !== 10)
      return res.json({
        Response: "Atleast 10 digits mobile_no is required",
      });

    // validating gender M or F...............
    if (!(gender === "M" || gender === "F"))
      return res.json({ Response: "Gender should be M or F" });

    const query =
      "INSERT INTO users (user_id,firstname,lastname,date_of_birth,mobile_no,gender,address,status) VALUES ?";
    const value = [
      [
        user_id,
        firstname,
        lastname,
        date_of_birth,
        mobile_no,
        gender,
        address,
        status,
      ],
    ];

    sql.query(query, [value], function (err, results) {
      if (!err) {
        console.log("Data inserted successfully with with emp_id = ", user_id);
        return res.status(200).json({
          Response: `user succesfully inserted`,
        });
      } else {
        console.log("Error", err);
        return res.status(400).send({
          Response: "Check your user_id ..! User id is duplicate..!",
          error: err.message,
        });
      }
    });
  } catch (error) {
    console.log("Error", error);
    return res.sendStatus(400).json({ message: "Something went wrong" });
  }
};

const updateUserData = async (req, res, next) => {
  try {
    const {
      user_id,
      firstname,
      lastname,
      date_of_birth,
      mobile_no,
      gender,
      address,
      status,
    } = req.body;

    //....checking character length
    if (
      firstname.length > 15 ||
      firstname.length < 1 ||
      lastname.length > 15 ||
      lastname.length < 1
    )
      return res.json({
        Response:
          "Characters entered in firstname and lastname must be greater than 2 and less than 15",
      });
    console.log(mobile_no.length);
    if (mobile_no.toString().length !== 10)
      return res.json({
        Response: "Atleast 10 digits mobile_no is required",
      });

    // validating gender M or F...............

    if (gender !== "M" || gender !== "F")
      return res.json({ Response: "Gender should be M or F" });

    const updatedQuery =
      "UPDATE users SET firstname=?,lastname=?,date_of_birth=?,mobile_no=?,gender=?,address=?,status=? where user_id=?";
    const value = [
      firstname,
      lastname,
      date_of_birth,
      mobile_no,
      gender,
      address,
      status,
      user_id,
    ];

    sql.query(updatedQuery, value, function (err, row) {
      if (!err) {
        console.log(row);
        return res.status(200).json({
          Response: row,
        });
      } else {
        console.log("Error in updating user information", err);
        return res.status(400).send({ Response: err.message });
      }
    });
  } catch (error) {
    console.log("error", error);
    return res.sendStatus(400).json({ Response: error.message });
  }
};

const deleteUserData = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const deleteQuery = `DELETE FROM users WHERE user_id=${user_id}`;
    sql.query(deleteQuery, (err, result) => {
      if (!err) console.log("Data deleted", result);
      res.status(200).json({ Response: result });
    });
  } catch (error) {
    console.log("error", error);
    return res.sendStatus(400).json({ Response: error.message });
  }
};

const getUserDataPage = async (req, res, next) => {
  try {
    const query = `SELECT * FROM users LIMIT 2 OFFSET 2`;
    sql.query(query, (err, data) => {
      if (!err) res.status(200).json({ Response: data });
    });
  } catch (error) {
    console.log("error", error);
    return res.sendStatus(400).json({ Response: error.message });
  }
};

const getUserDataSort = async (req, res, next) => {
  try {
    const query = `SELECT * FROM users ORDER BY date_of_birth`;
    sql.query(query, (err, data) => {
      if (!err) res.status(200).json({ Response: data });
    });
  } catch (error) {
    console.log("error", error);
    return res.sendStatus(400).json({ Response: error.message });
  }
};

module.exports = {
  getUserDataPage,
  getUserData,
  postUserData,
  updateUserData,
  deleteUserData,
  getUserDataSort,
};
