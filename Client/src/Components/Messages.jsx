// import React, { useEffect } from 'react';
// import { io } from 'socket.io-client';

// function Messages({ S_Id, R_Id, message, askstate }) {
  
//   useEffect(() => {
   
//     const socket = io('https://real-time-chat-application-backend-giggle.vercel.app');
//     socket.on('new-message', (data) => {
//       console.log('New message received:', data);
//     });

    
//     return () => {
//       socket.off('new-message'); 
//     };
//   }, []); 

//   return (
//     <div>
//       {S_Id}
//       {R_Id}
//       {askstate ? <>{message}</> : <>no </>}
//     </div>
//   );
// }

// export default Messages;
