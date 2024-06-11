
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app=express()
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:["https://real-time-chat-application-uyhn.vercel.app","http://192.168.0.185:5173"],
    methods:["GET","POST"]
  }
});

io.on('connection', (socket) => {
  // console.log('A user connected', socket.id); 

  socket.on('disconnect', () => {
    // console.log('User disconnected'); 
  });

  socket.on('send-message', (message) => {
    // console.log('Message received:', message); 
     io.emit('new-message', ({message})); 
  });
});

export {server,app}

export { io };
