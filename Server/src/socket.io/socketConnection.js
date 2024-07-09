
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';


const app=express()
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:"https://real-time-chat-application-uyhn.vercel.app" 
  }
});


export {server,app}

export { io };
