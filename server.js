const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// database check
const db = require("./database/db");
db.connect((err) => {
  if (err) {
    console.log(err);
  } else console.log("DB connection");
});

const todoRouter = require("./routes/todo");
app.use("/todos", todoRouter);

const userRouter = require("./routes/user");
app.use('/users', userRouter);

// if you enter any wrong route, request automatically redirect to this because it has *
app.get("*", function (req, res) {
  res.status(200);
  res.json({
    message: "This is the root route",
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
