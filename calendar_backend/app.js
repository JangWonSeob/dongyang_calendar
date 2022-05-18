const express = require("express");
const app = express();

const port = 4000;
const host = "localhost";

app.listen(port, () => {
  console.log(`Hello, Express Server http://${host}:${port}`);
});
