export const UseVerifyotp=async(email,otp)=>{
    try {
        const response = await fetch('https://real-time-chat-application-rho.vercel.app/user/verify', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({ email,otp }),
        });
    
       const data=await response.json()
       console.log(data.verify); 
       return data.verify
       
      
        
      } catch (error) {
        console.error('Error:', error);
      }
}
UseVerifyotp("123@gmail.com","9089")