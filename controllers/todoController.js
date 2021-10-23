const { response, query } = require("express");
const db = require("../database/db");

//add to-do API

module.exports = {
  addTodo: async function (req, res) {
    const todoData = req.body;

    let sql = `INSERT INTO todo SET ?`;

    const query = db.query(sql, todoData, (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        message: "Todo added successfully",
        data: result,
      });
    });
    console.log(query.sql);
  },

  // Display to-do API
  showTodo: async function (req, res) {
    let sql = `SELECT * FROM  todo WHERE user_id='${req.tokenData.userId}' `;
    const query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        message: "Your Todos",
        data: result,
      });
    });
  },

  // Delete todo API
  deleteTodo: async function (req, res) {
    let sql = `DELETE FROM todo WHERE todo_id = '${req.params.todoID}' `;
    const query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        message: "Todo deleted successfully",
      });
    });

    // console.log(query.sql);
  },

  // update todo
  updatetodo: async function (req, res) {

    //removing previous data
    const newData=req.body;
    let insert=`Insert into todo SET ?`;
    let callingOldData = `Delete FROM todo WHERE todo_id = '${req.params.todoID}' `;

    db.query(callingOldData, (err, result) => {
      if (err) throw err;
    });
       const query = db.query(insert, newData, (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).json({
          message: "Todo Updated successfully",
          data: result,
        });
      });
      // console.log(query.insert);
  
  }
};
