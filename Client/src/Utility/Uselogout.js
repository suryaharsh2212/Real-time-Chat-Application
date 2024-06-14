async function UseLogoutUser()
{
    try {
        const response = await fetch('https://real-time-chat-application-backend-giggle.vercel.app/user/logout', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },
        });
    
       const data=await response.json()
       return data.response.error
      
        
      } catch (error) {
        console.error('Error:', error);
      }
}
export default UseLogoutUser