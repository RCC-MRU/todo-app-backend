const { response } = require("express");
const db = require("../database/db");

module.exports = {
  displayUser: function (req, res) {
    let sql = `SELECT * FROM user`;

    const query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send(result);
    });
  },

  addUser: async function (req, res) {
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
        console.log(err.sqlMessage);

        throw err;
      }

      //Checking as per rows length
      if (rows.length > 0) {
        res.status(409).json({
          message: "User aleady exsist"
        });
      } else {

        //Password checking
        if (userdata.password.length < 8) {
          res.status(400).json({
            message: "Password too short"
          });
        }
        //Insertion of data
        else {

          // regex statement
          var emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.{1,1}[a-zA-Z]{2,4}$/;

          //Checking for correct mail
          if(!emailPattern.test(userdata.email))
          {
            res.status(400).json({
              message: "Invalid email"
            });

          }else{
            const query = db.query(sql, userdata, (err, result) => {
              if (err) {
                console.log("line 31: ", err.sqlMessage);

                throw err;
              }

              res.status(200).json({
                message: "success message",
                data: result,
              });
            });

            console.log(query.sql);
          }
        }
      }
    });
  },


  login: async function (req, res) {
    let userdata = req.body;

    //Checking whether user exsist or not
    let exsistenceSql = `Select * from user where username ='${userdata.username}'`;
    const loginUser = db.query(exsistenceSql, (err, rows) => {
      if (err) {
        console.log(err.sqlMessage);
        throw err;
      }

      if (rows.length > 0) {
        let passwordCheck = `Select password from user where username ='${userdata.username}'`;

        //Password query
        const passwordCheckSql = db.query(passwordCheck, (err, rows) => {
          if (err) {
            console.log(err.sqlMessage);
            throw err;
          }

          //Checking Password
          if(userdata.password==rows[0].password)
          {
            res.status(200).json({
              message:"Login Sucessfully"
            })
          }else
          {
            res.status(403).json({
              message:"Incorrect password"
            })
          }


        });
      } else {
        res.status(400).json({
          message: "User do not exsist",
        });
      }
    });
  },
};
