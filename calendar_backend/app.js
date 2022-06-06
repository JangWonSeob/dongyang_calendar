const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const cors = require("cors");

const port = 5000;
const host = "localhost";

const { User } = require("./modules/user");

const config = require("./config/serverConfig");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Hello, Express Server http://${host}:${port}`);
});

app.use(bodyParse.urlencoded({ extented: true }));
app.use(bodyParse.json());

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/user", require("./routes/user"));

app.get("/", (req, res) => {
  res.send("Hello World Home");
});
