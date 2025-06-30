import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register() {
 const [name,setName]=useState("");
 const [username,setUsername]=useState("");
 const[password,setPassword]=useState("");

 const navigate=useNavigate();

  const handleRegister= async (e)=>{

    e.preventDefault();
    if((name.trim()==="")|| (username.trim()==="") || (password.trim()===""))
    {
      alert("Please Enter All the detail");
      return;
    }

    const userData={
      name,
      email: username,
      password
    };
    
    try {
      
      
    
    const data= await fetch("http://localhost:4798/notes/user/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      
      body:JSON.stringify(userData),
      
    });

    if(!data.ok)
    {
      throw new Error("Network response was not ok");
    }
    
    const result=await data.json();
    console.log("User registered :",result);
    alert("Register Successful !");
    navigate("/login");

} catch (error) {
  console.log("Error during registeration:",error);
  alert("Registraion failed.");
}
  };
  return (
    <div className='register-page'>

   <form onSubmit={handleRegister} className='register-form'>
    <input type='text' placeholder='enter name'   value={name} onChange={(e)=>setName(e.target.value)}/>
    <input type='text' placeholder='Enter user id' value={username} onChange={(e)=>setUsername(e.target.value)} />
    <input type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} />
    <button type='submit'>submit</button>
   </form>
    </div>
  )
}

export default Register;