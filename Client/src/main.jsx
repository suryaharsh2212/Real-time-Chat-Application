
import ReactDOM from 'react-dom/client'
import './index.css'
import {Route, RouterProvider,  createBrowserRouter, createRoutesFromElements } from 'react-router-dom' 
import RegisterUser from './Components/RegisterUser.jsx'
import Login from './Components/Login.jsx'
import Layout from './Layout.jsx'
import Hero from './Components/Hero.jsx'
import Chatbox from './Components/Chatbox.jsx'



const router=createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Hero/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<RegisterUser/>}/>
         <Route path='/chatbox/:id/:name' element={<Chatbox/>}/> 
        

  </Route>
  

    

    
    
      
    
    
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router}/>  
  
   
 
  
  </>
)
