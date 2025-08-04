import React, { useState } from 'react'
import loginimg from '../assets/login.png'
import {useNavigate} from 'react-router-dom'
import { FaUser,FaLock } from "react-icons/fa";


const Login = (props) => {
    const[credential,setcredentail] = useState({email:"",password:""})
    const navigate = useNavigate();

     const handlesubmit= async (e)=>{
         e.preventDefault();
         console.log("form submitted")
        //api call
         const response = await fetch('http://localhost:5000/api/auth/login', {
           method: "POST",
           headers: {
          "Content-Type": "application/json",
         },
         body: JSON.stringify({email:credential.email,password : credential.password}),
         });
         const json = await response.json();
         console.log( json.authtoken)

         if(json.success){
           //save the token and redirect
           localStorage.setItem('token',json.authtoken)
           // use history hook redirect ker dega login page se note page pr
           navigate('/')
          console.log(json.authtoken);
          console.log("successfully logged in");
          props.showalert("succesfully login","success")
          
          }
         else{
           props.showalert("oops! user with this email doesn't exist","warning")
       }
    }

    
      const onchange = (e)=>{
        setcredentail({...credential,[e.target.name ]:e.target.value })
        console.log(credential)
      }

  return (
    <div className='  min-vw-100 min-vh-100  d-flex  justify-content-center align-items-center ' style={{backgroundColor:'rgb(173,216,230)'}}>
      <div className=' text-center p-4 border rounded shadow ' style={{width:'500px',backgroundColor:'white', height:'350px'}}>
        
         <h2 className='mt-2'>Login Here</h2>
      <form onSubmit={handlesubmit} >
        <div className="mb-3">
        <label htmlFor="email" className="form-label mx-2 ">Email address</label>
        <FaUser className='icon'/>
        <input type="email" className="form-control" id="email" value = {credential.email} name = "email" aria-describedby="emailHelp" onChange={onchange}/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
         
      <div className="mb-3">
          <label htmlFor="password" className="form-label mx-2">Password</label>
          <FaLock className='icon'/>
          <input type="password" className="form-control" id="password"  value = {credential.password} name='password' onChange={onchange}/>
     </div>
  
     <button type="submit" className="btn btn-primary "  >Login</button>
    </form>

      </div>
      
    </div>
  )
}

export default Login
