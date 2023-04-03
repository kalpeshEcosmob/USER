const sql = require("../database/database").sql;
const { validationResult } = require("express-validator");

const getUsersData = async (req, res, next) => {
  try {
    const { column_name, totalDoc } = req.body;
    let page_no = req.body.page_no;
    if (!page_no) page_no = 1;
    page_no = page_no - 1;

    const from = page_no * totalDoc;

    const query = `SELECT * FROM users ORDER BY ${column_name} LIMIT ${totalDoc} OFFSET ${from} `;
    sql.query(query, (err, data) => {
      if (!err) res.status(200).json({ Response: data });
    });
  } catch (error) {
    console.log("error", error);
    return res.sendStatus(400).json({ Response: error.message });
  }
};

const getUserDataById = async (req, res, next) => {
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
      return res
        .status(400)
        .json({ Response: errors.array().map((problem) => problem.msg) });
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
          Response:
            "Check your user_id ..! User id is duplicate..! Please change user id..!",
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ Response: errors.array().map((problem) => problem.msg) });
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
          Response: "User updated successfully...!",
          row: row,
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

module.exports = {
  getUserDataById,
  getUsersData,
  postUserData,
  updateUserData,
  deleteUserData,
};
