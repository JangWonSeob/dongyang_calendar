const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const cors = require("cors");

const port = 5000;
const host = "localhost";

const config = require("./config/serverConfig");

// 몽구스 연동
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

// 바디파서 설정
app.use(bodyParse.urlencoded({ extented: true }));
app.use(bodyParse.json());

// cors 설정
const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};

app.use(cors(corsOptions));

// router 분리
app.use("/api/user", require("./routes/user"));
app.use("/api/calendar", require("./routes/calendar"));

app.get("/", (req, res) => {
  res.send("Hello World Home");
});
