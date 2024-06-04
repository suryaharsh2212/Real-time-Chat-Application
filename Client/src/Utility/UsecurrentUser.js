

async function UseCurrentUser(Id)
{
    try {
        const response = await fetch('https://real-time-chat-application-uyhn-pf4widpb7.vercel.app/user/getcurrentuser', {
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
UseCurrentUser('665a1285174b061d5dcf72c0')
export default UseCurrentUser