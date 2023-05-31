import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { roomHandler } from "./room/index.js";
import { players } from "./room/index.js";

const port = 8080;
const app = express(); //créer express app
app.use(cors);
const server = http.createServer(app); //créer serveur http
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
}); //créer websocket serveur

io.on("connection", (socket) => {
  console.log("user is connected");
  roomHandler(socket);

  socket.on("disconnect", () => {
    console.log("user is disconnected");
  });
});

server.listen(port, () => {
  console.log(`Le serveur Express écoute sur le port ${port}`);
});
