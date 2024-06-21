import { Link, useNavigate } from "react-router-dom"
import UseLogin from "../Utility/useLogin"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useState } from "react";
import useUserStore from "../GlobalState";
// import { createSocket } from "../Utility/UseSocketConnection"; 

import 'ldrs/tailChase'
import Auth from "./Auth";


export default function Login() {
  const updateId = useUserStore(state => state.updateId);
  const updatename=useUserStore(state=>state.updateFullName);
  const [phoneNumber, setphonenumber] = useState("")
  const [loading, setloading] = useState(false)
  const navigate=useNavigate()
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
  const [password, setPassword] = useState("")
  const submitLogin=async(e)=>{
    e.preventDefault();
    setloading(true)
     const response=await UseLogin(phoneNumber,password);
    
    
     if(!response.response.error)
      {
        success("Login sucesss")
         console.log("updating",response.response.name);
        createSocket()
        updateId(response.response.id)
        console.log(response.response.id);
        updatename(response.response.name)
        setloading(false)
        navigate(`/chatbox/${response.response.id}/${response.response.name}`) 
     
      }
     else{
      notify(response.response.message)
      setloading(false)
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
      <div className="grid grid-cols-1  gap-4">
        {/* <div>
          <img src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg?size=626&ext=jpg" alt="" />
        </div> */}
        <div className="box flex justify-center items-center " style={{backgroundColor:"FAFAFA"}}>
     
        <div className="flex h-screen w-fit p-10 md:p-20 flex-1 flex-col justify-center   lg:px-8 outline-5 outline-double" >
       <div className="sm:mx-auto sm:w-full sm:max-w-sm outline-slate-800 ">
         
         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Sign in to your account
         </h2>
         <Auth/>
       </div>

       <div className="mt-10 sm:mx-auto sm:w-full outline-slate-800 p-10  shadow-lg  sm:max-w-sm">
         <form className="space-y-6" onSubmit={submitLogin} method="POST">
           <div>
             <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
               Phone Number
             </label>
             <div className="mt-2 ">
               <input
                 id="email"
                 name="number"
                 type="number"
                 autoComplete="number"
                 value={phoneNumber}
                 onChange={(e)=>setphonenumber(e.target.value)}
                 className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              
               />
             </div>
           </div>

           <div>
             <div className="flex items-center justify-between">
               <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                 Password
               </label>
               <div className="text-sm">
                 <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                   Forgot password?
                 </a>
               </div>
             </div>
             <div className="mt-2">
               <input
                 id="password"
                 name="password"
                 type="password"
                 autoComplete="current-password"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>

           <div>
             <button
               type="submit"
               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
               {loading?
                  <l-tail-chase
                  size="20"
                  speed="1.75"
                  color="white"
                ></l-tail-chase>
               :"Sign in"}
             </button>
           </div>
         </form>
      

         <p className="mt-10 text-center text-sm text-gray-500">
           Not a member?{' '}
           <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Register Now      
           </Link> <br/>
           <Link className="text-blue bg-white" to="/">Home</Link>
         </p>
       </div>
     </div>
   </div>

      </div>
    </div>
   
  )
}
