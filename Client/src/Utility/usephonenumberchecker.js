import { phone } from 'phone';

function isValidIndianPhoneNumber(phoneNumber) {
    const parsedPhoneNumber = phone(phoneNumber, { country: 'IN' });
    return parsedPhoneNumber.isValid
  
}
export default isValidIndianPhoneNumber