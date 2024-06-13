

async function UseCurrentUser(Id)
{
    try {
        const response = await fetch('http://localhost:8000/user/getcurrentuser', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({ Id }),
        });
    
       const user=await response.json()
      
       
       return user.data.fullname
      
        
      } catch (error) {
        console.error('Error:', error);
      }
}

export default UseCurrentUser