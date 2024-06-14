async function UseGetUsers(currentUser)
{
    try {
        const response = await fetch('https://real-time-chat-application-nine-rho.vercel.app/user/getUser', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },
          
        });
    
       const users=await response.json()
       console.log(users);
      
       
       return users
      
        
      } catch (error) {
        console.error('Error:', error);
      }
}

export default UseGetUsers