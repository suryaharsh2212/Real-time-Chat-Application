// Include the Socket.IO library
import { io } from "socket.io-client";

// Replace with your backend URL
const socket = io('https://real-time-chat-application-backend-giggle.vercel.app',{
    auth:"yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2Njc1ZGY5N2Q2NzkwNTg1MDM1NzU0MzYiLCJpYXQiOjE3MTkyNDU4MjAsImV4cCI6MTcxOTMzMjIyMH0.wggUtHHtG9PUqq1xd5dQ4m3GFUYQNnfdrex5zA9QoeI"
  });
// const socket=io ('http://localhost:8000') 
console.log(socket);

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
