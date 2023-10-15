// Servidor Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    // Sockets config
    this.io = socketio(this.server, {
      /*configs*/
    });
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    // middlewares init
    this.middlewares();

    // socket init
    this.configSockets();

    // server init
    this.server.listen(this.port, () => {
      console.log(`Server corriendo en puerto ${this.port}`);
    });
  }
}

module.exports = Server;
