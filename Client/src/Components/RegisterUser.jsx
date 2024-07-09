import { useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import isValidIndianPhoneNumber from '../Utility/usephonenumberchecker.js';
import { Link, useNavigate } from 'react-router-dom';
import UseRegisterUser from '../Utility/useRegistration.js';
import Auth from './Auth.jsx';
import 'ldrs/tailChase'
import 'ldrs/helix'
import 'ldrs/grid'
const RegisterUser = () => {
  const notify = (prompt) => {
    toast.error(` ${prompt}`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
  const success = (prompt) => {
    toast.success(`${prompt}`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
  const [showAuth, setShowAuth] = useState(false);
  const [fullname, setfullname] = useState("")
  const [phoneNumber, setphonenumber] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setloading] = useState(true)
  const navigate = useNavigate()
  
  const submitRegistration = async (e) => {
    e.preventDefault();
    if (!fullname || !phoneNumber || !password) {
      notify("Please enter the required fields. ")
    }
    else if (!isValidIndianPhoneNumber(phoneNumber)) {
      notify("Phone number is not valid ")
    }
    
    else {
      setloading(false) 
      setShowAuth(true) 
      const response = await UseRegisterUser(fullname, phoneNumber, password)
      if (response.error) {
        notify(response.message)
        setloading(true)
      }
      else {
        success(response.message)
        navigate("/login")
        setloading(true)
      }
    }

  }

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
       {showAuth===true? <Auth />:null}
      <div className="h-screen  md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden"  >
          <div>
            <div className='z-10  opacity-20'>
              <l-grid
                size="200"
                speed="5.5"
                color="cyan"
              ></l-grid>

            </div>
            <h1 className="text-white font-bold text-4xl font-sans">Lets chat</h1>
            <p className="text-white mt-1">"GiggleChat: Spread Joy, One Line at a Time"</p>
            <button className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
          </div>


          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>

        </div>

        <div className="flex md:w-1/2 justify-center py-10 items-center h-screen  bg-white">

          <form className="bg-white shadow-xl p-8 rounded-sm" onSubmit={submitRegistration}>

            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello !</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Welcome To GiggleChat</p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <input value={fullname} onChange={(e) => setfullname(e.target.value)} className="pl-2 outline-none border-none" type="text" name="fullname" placeholder="Full name" />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <img className='h-6 w-6' src="https://cdn-icons-png.flaticon.com/128/16151/16151482.png" alt="" />

              <input value={phoneNumber} onChange={(e) => setphonenumber(e.target.value)} className="pl-2 outline-none border-none" type="text" name="phoneNumber" placeholder="PhoneNumber" />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className="pl-2 outline-none border-none" type="password" name="password" placeholder="Password" />
            </div>
            <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">
              {loading
                ? "Register"
                :
                <l-tail-chase
                  size="25"
                  speed="1.75"
                  color="white"
                >Loading...</l-tail-chase>

              }</button>
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer"><Link to="/login">Already a User ? Login </Link>    </span><br /> <span className=' text-md relative left-2  top-2 text-blue-600'> <Link to="/">Home</Link></span>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterUser;
