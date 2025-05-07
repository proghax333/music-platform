import { Server } from "socket.io";

export class ChatServer {
  /** @type {import("http").Server} */
  server;

  /** @type {import("socket.io").Server} */
  io;

  constructor() {}

  static get deps() {
    return ["server"];
  }

  async initialize() {
    const io = new Server(this.server);
    this.io = io;

    io.on("connection", (socket) => {});
  }
}
