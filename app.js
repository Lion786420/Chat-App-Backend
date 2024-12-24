const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const mongoose = require("mongoose");
const usersRouter = require("./controller/users");

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log("Connected to MongoDb");
  })
  .catch((error) => {
    console.log(error);
    logger.info("Error connecting to db");
  });

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);

module.exports = app;
