async function UseLogin(phoneno,password)
{
    try {
        const response = await fetch('https://real-time-chat-application-rho.vercel.app/user/login', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({ phoneno, password }),
        });
    
       const data=await response.json()
      //  console.log(data); 
       return data
      
        
      } catch (error) {
        console.error('Error:', error);
      }
}
export default UseLogin
