
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';


const app=express()
const server = http.createServer(app);

const io = io();

io.on('connection', (socket) => {
  console.log("someone connected");
  socket.on('disconnect', () => {
   console.log("someone disconnected");
  });
});

export {server,app}

export { io };
