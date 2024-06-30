async function UseSearchUser(name)
{
    try {
        const response = await fetch('https://real-time-chat-application-rho.vercel.app/user/search', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({name}),
        });
    
       const user=await response.json()
        console.log(user);
       
       return user
      
        
      } catch (error) {
        console.error('Error:', error);
      }
}

export default UseSearchUser