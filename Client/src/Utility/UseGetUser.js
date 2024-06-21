async function UseGetUsers()
{
    try {
          const response = await fetch('https://real-time-chat-application-backend-giggle.vercel.app/user/getUser', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
       const users=await response.json();
       return users;
      } catch (error) {
        console.error('Error:', error);
      }
}
export default UseGetUsers;   