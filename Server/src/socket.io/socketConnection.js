
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app=express()
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:"https://real-time-chat-application-uyhn.vercel.app",
    methods:["GET","POST"]
  }
});

io.on('connection', (socket) => {
  

  socket.on('disconnect', () => {

  });

  socket.on('send-message', (message) => {
    // console.log('Message received:', message); 
     io.emit('new-message', ({message})); 
  });
});

export {server,app}

export { io };
