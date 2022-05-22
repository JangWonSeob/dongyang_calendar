const express = require("express");
const app = express();

const port = 5000;
const host = "localhost";

const config = require("./config/mongoDb");

const mongoose = require("mongoose");
const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Hello, Express Server http://${host}:${port}`);
});

app.get("/", (req, res) => {
  res.json({ result: true });
});
