const express = require("express");
const router = express.Router();
 
// importing controller
const userController = require("../controllers/userController");

router.get("/", userController.displayUser);

router.post("/signup", userController.registerUser);

router.post("/login", userController.loginUser);

router.delete("/delete/:ID", userController.deleteUser);

module.exports = router;
