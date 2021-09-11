const db = require("../database/db");

module.exports = {
  displayUser: function (req, res) {
    let sql = "SELECT * FROM `user` ";

    const query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }

      res.status(200).send(result);
    });

    console.log(query.sql);
  },

  addUser: function (req, res) {
    const userData = req.body;

    /* 
    1. check if user exist through email - Rakhi
    2. check password length using if - Rakhi
    3. add regex for email - Rakhi
    4. check if user exist through email - Bhavesh
    5. phone number should be equal to 10 - Bhavesh
    */

    let sql = "INSERT INTO `user` SET ?";

    const query = db.query(sql, userData, (err, result) => {
      if (err) {
        console.log("line 31: ", err.sqlMessage)
        
        throw err;
        
      }

      res.status(200).json({
        message: "success message",
        data: result,
      });
    });

    console.log(query.sql);
  },
};
