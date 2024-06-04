async function UseGetUsers(currentUser)
{
    try {
        const response = await fetch('http://localhost:8000/user/getUser', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },
          
        });
    
       const users=await response.json()
      
       
       return users
      
        
      } catch (error) {
        console.error('Error:', error);
      }
}

export default UseGetUsers