import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
 const navigate=useNavigate();
const[username,setUsername]=useState("");
const[password,setPassword]=useState("");

const handleLogin=async(e)=>{
  e.preventDefault();
  console.log("User details : ",username,password);
  if(!username.trim() || !password.trim())
  {
    alert("Invalid Details")
    return;
  }

  const data={
    email:username,
    password
  };

  try {
    const response=await fetch("http://localhost:4798/notes/user/login",{
      method:"POST",
      headers:{

       "Content-Type":"application/json",
      },
      body:JSON.stringify(data)
    });


    if(!response.ok)
    {
      throw new Error("Network response was not ok")
    }
    const result=await response.json();
    console.log("user detail",result);
    alert("Login Successfull");
    localStorage.setItem("isLoggedIn","true");
    navigate('/notesapp');

    
  } catch (error) {
    console.log("Error during Login",error)
    alert("Login failed")
  }

};


  return (
   <div className='login-page'>

     <form onSubmit={handleLogin} className='login-form'>
        <input type='text' placeholder='username' value={username}  onChange={(e)=>setUsername(e.target.value)} />

        <input type='password' placeholder='password' value={password} autoComplete='current-password' onChange={(e)=>setPassword(e.target.value)} />
       <div className='login-actions'>

        <button type='submit'>Login</button>
        <Link to='/register' className='signup-link'>Signup</Link>
       </div>
     </form>
   </div>
  )
}

export default Login;
