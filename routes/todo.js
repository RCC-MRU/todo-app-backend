const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoController");

const { jwtVerification } = require("../middleware/token");

router.get("/display", jwtVerification, todoController.showTodo);

router.post("/add", jwtVerification, todoController.addTodo);

router.delete("/delete/:todoID", jwtVerification, todoController.deleteTodo);

router.put("/update/:todoID", jwtVerification, todoController.updatetodo);

module.exports = router;
