// Include the Socket.IO library
import { io } from "socket.io-client";

// Replace with your backend URL
const socket = io('https://real-time-chat-application-rho.vercel.app/',
  {
 
    withCredentials:true,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true
        },

  }
 
);
// const socket=io ('http://localhost:8000') 
// console.log(socket); 

// Event listeners to handle connection and errors
socket.on('connect', () => {
  console.log('Connected to backend');
});

socket.on('connect_error', (error) => {
  console.error('Failed to connect to backend:', error);
});

socket.on('disconnect', () => {
  console.log('Disconnected from backend');
});
