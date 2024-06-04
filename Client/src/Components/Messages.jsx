import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

function Messages({ S_Id, R_Id, message, askstate }) {
  
  useEffect(() => {
   
    const socket = io('http://localhost:8000');
    socket.on('new-message', (data) => {
      console.log('New message received:', data);
    });

    
    return () => {
      socket.off('new-message'); 
    };
  }, []); 

  return (
    <div>
      {S_Id}
      {R_Id}
      {askstate ? <>{message}</> : <>no </>}
    </div>
  );
}

export default Messages;
