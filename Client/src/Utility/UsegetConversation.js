export const UsegetConversation=async(senderId,receiverId)=>{
    console.log(senderId,receiverId);
    try {
        const response = await fetch('https://real-time-chat-application-backend-giggle.vercel.app/user/getConversation', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({ senderId,receiverId }),
        });
    
       const data=await response.json()
       console.log(data);
       console.log();
       return data
      
    
      } catch (error) {
        console.error('Error:', error);
      }
}



  UsegetConversation("6654e41a7cb9097127d7a238","6654e4457cb9097127d7a23c") 