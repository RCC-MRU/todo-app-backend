const { response } = require("express");
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
    let sql = `SELECT * FROM  todo`;
    const query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        message: "Your Todos",
        data: result,
      });
    });
    console.log(query.sql);
  },

  // Delete todo API
  deleteTodo: async function (req, res) {
    let sql = `DELETE FROM todo WHERE todo_id = '${req.params.todo_id}' `;
    const query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        message: "Todo deleted successfully",
      });
    });

    console.log(query.sql);
  },
// update todo
updatetodo : async function(req,res){
  const data = req.body;
  const id = req.params.todo_id;
  console.log(data);
  let sql = `UPDATE todo SET ? WHERE todo_id = '${id}'`; 
    const query = db.query(sql,data,(err,result)=>{
        if(err){
          console.log(err)
            throw err;
        }
        res.status(200).json({
            message: "TODO updated",
            data:result,
        });
    });
    console.log(query.sql);
},
};