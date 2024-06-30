
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import https from "https"

const app=express()
const server = https.createServer(app);

const io = new Server(server,{
  path:"/socket",
  wsEngine:['ws','wss'],
  allowEIO3:true,
  transports:['websocket','polling'],
  cors:{
    origin:"*",
    methods:["GET","POST"],
    // credentials:true,
    // allowedHeaders: ["my-custom-header"], 
  }
});

io.on('connection', (socket) => {
  console.log("someone connected");
  socket.on('disconnect', () => {
   console.log("someone disconnected");
  });
});

export {server,app}

export { io };
