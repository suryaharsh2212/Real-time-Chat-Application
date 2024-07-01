
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';


const app=express()
const server = http.createServer(app);

const io = io('https://real-time-chat-application-backend-giggle.vercel.app',
  {
    path:"/socket",
    transports:['websocket','polling'],
    // reconnection:true,
    // transports:['websocket','polling'],
    //  reconnectionAttempts:5,
    withCredentials:true,

  }
 
)

io.on('connection', (socket) => {
  console.log("someone connected");
  socket.on('disconnect', () => {
   console.log("someone disconnected");
  });
});

export {server,app}

export { io };
