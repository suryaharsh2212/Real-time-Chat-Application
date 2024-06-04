
import pkg from 'otpless-node-js-auth-sdk';
const { UserDetail } = pkg;

const verifyToken = async () => {   
    const clientId = 'EKIMCD6U8UXDSX9S65NJ2GFV8H8D7YIB';
    const clientSecret = 'l2c8ot1yoxbism5ufqz7ps6dauf6euaz';

    const token = "UODSOLQZG1AJ2JED0NIZ"; // Replace with your token
    const response = await UserDetail.verifyToken(token, clientId, clientSecret);
    console.log(response.status);    
}

verifyToken();

