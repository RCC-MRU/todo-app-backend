const express = require("express");
const router = express.Router();

// importing controller
const userController = require("../controllers/userController");

router.get("/", userController.displayUser);
router.post("/", userController.addUser);


module.exports = router;
