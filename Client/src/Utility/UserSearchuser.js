async function UseSearchUser(name)
{
    try {
        const response = await fetch('http://localhost:8000/user/search', {
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