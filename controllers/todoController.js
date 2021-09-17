
const { response } = require("express");
const db = require("../database/db");


//add to-do API

module.exports = {
    addtodo : async function(req, res){
        let sql = `INSERT INTO user SET ?`;

        const query = db.query(sql,(err,result) => {
if(err){
    throw err;
}
res.status(200).send(result);
        });
    },

    // Display to-do API
    displaytodo : function(req,res){
        let sql =  `SELECT * FROM  user`;
        const query   = db.query(sql,(err,result)=>{
            if(err){
                throw err;
            }
            res.result(200).send(result);
        });
    },

        // Delete todo API
    deletetodo : function(req,res){
        let sql = `DELETE FROM todo where todo_id = ${req.param.todo_id}`;
        const query = db.query(sql,(err,result) =>{
        if(err)
            {
            throw err;
    }
        res.status(200).send(result);

        });
    },
};