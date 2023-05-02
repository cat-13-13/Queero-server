const app = require("./app");
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 5005;

require('./config/socket.js')(server)


server.listen(PORT, () => {

  console.log(`Server listening on http://localhost:${PORT}`);

});
