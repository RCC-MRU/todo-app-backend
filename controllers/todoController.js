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

    const newData=req.body;
    let update=`Update todo set task_title='${newData.task_title}',importance='${newData.importance}',completed='${newData.completed}',description='${newData.description}' where todo_id=${req.params.todoID}`;
  
    db.query(update, (err, result) => {
      if (err) throw err;
    });
       const query = db.query(update, newData, (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).json({
          message: "Todo Updated successfully",
          data: result,
        });
      });
  
  },

  showImportantList: async function (req, res)
  {
    let sql=`Select * from todo where todo_id='${req.params.todoID}' And importance=1`
    db.query(sql ,(err,result)=>
    {
      console.log(sql)
      res.status(200).json(
        {
          data:result
        }
      );
    });

  },

  showCompletedList: async function (req, res)
  {
    let sql=`Select * from todo where todo_id='${req.params.todoID}' And completed=1`
    db.query(sql ,(err,result)=>
    {
      console.log(sql)
      res.status(200).json(
        {
          data:result
        }
      );
    });

  }

};

