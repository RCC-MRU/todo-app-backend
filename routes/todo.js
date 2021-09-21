const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoController");

router.get("/display", todoController.showTodo);

router.post("/add", todoController.addTodo);

router.delete("/delete/:todoID", todoController.deleteTodo);

router.put("/update/:todoID", todoController.updatetodo);

module.exports = router;
