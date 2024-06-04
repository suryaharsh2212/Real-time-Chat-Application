async function UseRegisterUser(fullname,phoneno,password)
{
    try {
        const response = await fetch('http://localhost:8000/user/registeruser', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({ fullname,phoneno, password }),
        });
    
       const data=await response.json()
       return data
      
        
      } catch (error) {
        console.error('Error:', error);
      }
}
export default UseRegisterUser