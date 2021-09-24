const sign=require('../middleware/token');
const db = require("../database/db");
const { use } = require('../routes/todo');

module.exports = {
  displayUser: async function (req, res) {
    let sql = `SELECT * FROM user`;

    const query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        message: "all users",
        data: result,
      });
    });
  },

  registerUser: async function (req, res) {
    const userdata = req.body;
    /* 
    1. check if user exist through email - Rakhi
    2. check password length using if - Rakhi
    3. add regex for email - Rakhi
    4. check if user exist through email - Bhavesh
    5. phone number should be equal to 10 - Bhavesh
    */

    let sql = `INSERT INTO user SET ?`;

    let exsistenceSql = `Select * from user where email ='${userdata.email}'`;

    //Checking the already exsistence of user
    const exsistenceCheck = db.query(exsistenceSql, (err, rows) => {
      if (err) {
        throw err;
      }

      //Checking as per rows length
      if (rows.length > 0) {
        res.status(409).json({
          message: "User aleady exist",
        });
      } else {
        //Password checking
        if (userdata.password.length < 8) {
          res.status(400).json({
            message: "Password length too short",
          });
        }
        //Insertion of data
        else {
          // regex statement
          var emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.{1,1}[a-zA-Z]{2,4}$/;

          //Checking for correct mail
          if (userdata.email == null || !emailPattern.test(userdata.email)) {
            res.status(400).json({
              message: "Invalid email address",
            });
          } else {
            const query = db.query(sql, userdata, (err, result) => {
              if (err) {
                throw err;
              }

              res.status(200).json({
                message: "Record added sucessfully",
                data: result,
              });



            });

            console.log(query.sql);
          }
        }
      }
    });
  },

  loginUser: async function (req, res) {
    let userdata = req.body;

    //Checking whether user exsist or not
    let exsistenceSql = `Select * from user where username ='${userdata.username}' AND password = '${userdata.password}' `;
    const loginUser = db.query(exsistenceSql, (err, rows) => {
      if (err) {
        throw err;
      }

      if (rows.length > 0) {
        //Generating token
        let userID = rows[0].id;
        let username = rows[0].username;
        let fullname = rows[0].fullname;

        res.status(200).json({
          message: `${username} logged in successfully`,
          username: username,
          fullname: fullname,
          token: sign.generateToken(userID)
        });


      } else {
        res.status(400).json({
          message: "Invalid credentials",
        });
      }
    });
    console.log(loginUser.sql);
  },
};
