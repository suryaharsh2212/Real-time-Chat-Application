


export const UseSendMessage=async(message,senderId,receiverId)=>{
    try {
        const response = await fetch('https://real-time-chat-application-backend-giggle.vercel.app/user/send', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({ message, senderId,receiverId }),
        });
    
       const data=await response.json()
       console.log(data);
       return data
       
      
        
      } catch (error) {
        console.error('Error:', error);
      }
}
//  UseSendMessage("hiii bro","6654e41a7cb9097127d7a238","6654e4457cb9097127d7a23c")

// UseSendMessage("hloo broo","6654e4457cb9097127d7a23c","6654e41a7cb9097127d7a238")