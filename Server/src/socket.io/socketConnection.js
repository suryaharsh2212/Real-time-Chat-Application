
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app=express()
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:"https://real-time-chat-application-uyhn.vercel.app/chatbox/6675df97d679058503575436/Surya%20%20Prakash",
    methods:["GET","POST"],
    credentials: true,
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
