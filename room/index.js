import { v4 as uuidV4 } from "uuid";
import { io } from "../server.js";

export let players = []
export const rooms = []

export const roomHandler = (socket) => {
  const createRoom = (roomName) => {
    let room = {
        roomId : Math.floor(Math.random() * (1000 - 10000 + 1)) + 1000,
        roomName : roomName,
        status : 'waiting',             //waiting, started, finished
        players : []

    }

    console.log("user created a room" + room.roomId);
    socket.emit("room-created", room);
    rooms.push(room)
  };

  

  const joinRoom = ( roomId ) => {
    console.log(roomId)
    const room = getRoom(roomId)
    socket.join(roomId)
    console.log(room)
    socket.emit("room-joined", room)
  };

  const updateRoom = (room) => {
    for(let i = 0; i < rooms.length; i++) {
        if(rooms[i].roomId == room.roomId) {
            rooms[i] = room
        }
    }
    console.log(room);
    socket.emit("room-updated", room)
  }

  

  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
  socket.on("update-room", updateRoom);




};



function getRoom(roomId) {
    for(let i = 0; i < rooms.length; i++) {
        if (rooms[i].roomId == roomId) {
            return rooms[i];
        }
    }
}

function updateRoom(room) {

}