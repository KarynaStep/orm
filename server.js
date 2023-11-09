const http = require("http");
const app = require("./app.js");
const {PORT} = require('./constsnts.js')

const port = process.env.PORT || PORT;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("server started at port = ", port);
});
