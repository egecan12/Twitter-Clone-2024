const http = require("http");

const server = http.createServer((req, res) => {
  console.log("joined");
});

server.listen(3001);
