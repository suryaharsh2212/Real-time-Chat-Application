async function UseLogoutUser()
{
    try {
        const response = await fetch('http://localhost:8000/user/logout', {
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