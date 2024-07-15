


export const UseSendMessage=async(message,senderId,receiverId)=>{
    try {
        const response = await fetch('https://real-time-chat-application-rho.vercel.app/user/send', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({ message, senderId,receiverId }),
        });
    
       const data=await response.json()
       return data
      } catch (error) {
        console.error('Error:', error);
      }
}
