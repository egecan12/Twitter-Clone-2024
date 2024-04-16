const express = require("express");
const app = express();
const port = 5000;

const server = app.listen(port, () => {
  console.log("server is listening on port" + port);
});
