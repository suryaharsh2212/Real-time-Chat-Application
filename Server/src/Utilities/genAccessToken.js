import jwt from "jsonwebtoken"

function genWebToken(userid)
{
 return jwt.sign(
    {
       userid
    },
   process.env.SECRETKEY,
    { expiresIn: '1d' }
  )
 
}
export default genWebToken