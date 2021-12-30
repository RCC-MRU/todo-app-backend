const { generateToken } = require("../middleware/token");
const db = require("../database/db");

const bcrypt = require("bcrypt");
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

    //Checking the already exsistence of user
    let exsistenceSql = `Select * from user where username = ?`;
    const exsistenceCheck = db.query(
      exsistenceSql,
      userdata.username,
      (err, rows) => {
        if (err) throw err;

        //Checking as per rows length
        if (rows.length > 0 && rows[0].active != 0) {
          res.status(409).json({
            message: "User aleady exist",
          });
        } else {
          //Password checking
          if (userdata.password.length < 5) {
            res.status(400).json({
              message: "Password length too short",
            });
          }
          //Insertion of data
          else {
            // regex statement
            const emailPattern =
              /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.{1,1}[a-zA-Z]{2,4}$/;

            //Checking for correct mail
            if (userdata.email == null || !emailPattern.test(userdata.email)) {
              res.status(400).json({
                message: "Invalid email address",
              });
            } else {
              const hashPassword = bcrypt
                .hash(userdata.password, 12)
                .then((arr) => {
                  const newuserdata = {
                    fullname: userdata.fullname,
                    email: userdata.email,
                    username: userdata.username,
                    password: arr,
                  };
                  console.log(newuserdata);

                  const dbAddQuery = `INSERT INTO user SET ?`;

                  const query = db.query(
                    dbAddQuery,
                    newuserdata,
                    (err, result) => {
                      if (err) {
                        throw err;
                      }

                      res.status(200).json({
                        message: "Record added sucessfully",
                        data: result,
                      });
                    }
                  );
                })
                .catch((error) => {
                  console.log(error);
                });

              // console.log(query.sql);
            }
          }
        }
      }
    );
  },

  loginUser: async function (req, res) {
    let userdata = req.body;

    //Checking whether user exsist or not
    let exsistenceSql = `Select * from user where username = ? AND active = 1`;
    const loginUser = db.query(
      exsistenceSql,
      [userdata.username],
      (err, rows) => {
        console.log(loginUser.sql);
        if (err) throw err;

        if (rows.length == 0) {
          res.status(400).json({
            message: "Invalid Credentials",
          });
        } else {
          bcrypt.compare(userdata.password, rows[0].password, (err, result) => {
            if (result) {
              let userID = rows[0].id;
              let username = rows[0].username;
              let fullname = rows[0].fullname;
              // console.log(userID);

              res.status(200).json({
                message: `${username} sucessfully logged in`,
                username: username,
                fullname: fullname,
                token: generateToken(userID),
              });
            } else {
              res.status(401).json({
                message: "You are not authorized",
              });
            }
          });
        }
      }
    );
  },

  deleteUser: async function (req, res) {
    let sql = `UPDATE user SET active = 0 where id = ? `;
    const query = db.query(sql, req.params.ID, (err, result) => {
      if (err) throw err;

      res.status(200).json({
        message: "Your account deleted sucessfully",
      });
    });
  },
};

/*
Register user extra code
else if (rows.length > 0 && rows[0].active == 0) {
          let sql = `Update user SET active=1 where username = ? `;

          let query = db.query(sql, userdata.username, (err, result) => {
            if (err) throw err;

            res.status(200).json({
              message: "Record reactivated sucessfully",
              data: result,
            });
          });
        }

*/
