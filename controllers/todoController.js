const { response, query } = require("express");
const db = require("../database/db");

//add to-do API

module.exports = {
  // add to-do
  addTodo: async function (req, res) {
    const todoData = req.body;
    const userID = req.tokenData.userId;
    const insertionData = {
      task_title: todoData.task_title,
      description: todoData.description,
      user_id: userID,
      importance: todoData.importance || 0,
      completed: todoData.completed || 0
    };
    let sql = `INSERT INTO todo SET ?`;

    const query = db.query(sql, insertionData, (err, result) => {
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

  // display all todos
  showTodo: async function (req, res) {
    let sql = `SELECT * FROM  todo WHERE user_id=? `;
    const query = db.query(sql, req.tokenData.userId, (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        message: "Your Todos",
        data: result,
      });
    });
  },

  // display todos which are not important
  showImportantList: async function (req, res) {
    let sql = `Select * from todo where user_id = ? And importance = ?`;
    db.query(sql, [req.tokenData.userId, 1], (err, result) => {
      console.log(sql);
      res.status(200).json({
        data: result,
      });
    });
  },

  // display todos which are not completed
  showCompletedList: async function (req, res) {
    let sql = `Select * from todo where user_id = ? And completed = ?`;
    db.query(sql, [req.tokenData.userId, 1], (err, result) => {
      console.log(sql);
      res.status(200).json({
        data: result,
      });
    });
  },

  // Delete todo API
  deleteTodo: async function (req, res) {
    let checkForExistance = `SELECT * FROM todo WHERE todo_id = ?`;
    const requestedID = req.params.todoID;
    const check = db.query(checkForExistance, requestedID, (err, result) => {
        if(err) throw err;
        
        if (result.length > 0) {
          let sql = `DELETE FROM todo WHERE todo_id = ?`;
          const query = db.query(sql, requestedID, (err, result) => {
            if(err) throw err;

            res.status(200).json({
              message: "Todo deleted successfully",
              data: result,
            });
          });
        } else {
          res.status(404).json({
            message: "Todo not found"
          });
        }
      }
    );
  },

  // update todo
  updatetodo: async function (req, res) {
    const content = req.body;
    const user_id = req.tokenData.userId;
    const updation = {
      task_title: content.task_title,
      importance: content.importance || 0,
      user_id: user_id,
      completed: content.completed || 0,
      description: content.description
    };
    // let update = `Update todo set task_title='${newData.task_title}',importance='${newData.importance}',completed='${newData.completed}',description='${newData.description}' where todo_id=${req.params.todoID}`;
    const updateSql = `UPDATE todo SET ? WHERE todo_id = ?`;
    const query = db.query(updateSql, [updation, req.params.todoID], (err, result) => {
      if (err) throw err;
      res.status(200).json({
        message: "Todo Updated Successfully!",
        data: result
      });
    });
    // const query = db.query(update, newData, (err, result) => {
    //   if (err) {
    //     throw err;
    //   }
    //   res.status(200).json({
    //     message: "Todo Updated successfully",
    //     data: result,
    //   });
    // });
  },
};
