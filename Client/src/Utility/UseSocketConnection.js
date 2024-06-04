
import { io } from 'socket.io-client';
const socket = io('https://real-time-chat-application-uyhn-pf4widpb7.vercel.app');
const createSocket=()=>{
    
    socket.on('connection',(socket)=>{
      console.log("A user connected :", socket.id);
      
    })
}

const sendmessage=(message)=>{
    console.log("i am ",message);
    
    socket.emit("send-message",message)
    
}

export {createSocket,sendmessage}