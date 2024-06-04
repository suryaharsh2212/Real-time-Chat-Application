


export const UseSendMessage=async(message,senderId,receiverId)=>{
    try {
        const response = await fetch('http://localhost:8000/user/send', {
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
// UseSendMessage("hiii bro","6654e41a7cb9097127d7a238","6654e4457cb9097127d7a23c")

// UseSendMessage("hloo broo","6654e4457cb9097127d7a23c","6654e41a7cb9097127d7a238")