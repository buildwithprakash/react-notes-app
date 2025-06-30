import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import  './Navbar1.css';
export default function Navbar() {
const navigate=useNavigate();
  const isLoggedIn=localStorage.getItem("isLoggedIn")==="true";

  const handleLogout=()=>{
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }
  return (
   <nav className='navbar'>
    <h1>Notes App</h1>
    <div className='nav-links'>
      {
        !isLoggedIn?(
          <>
          <Link to='/'>Home</Link>
          <Link to='register'>Register</Link>
          <Link to='/login'>Login</Link>
          <Link to='/about'>About</Link>
          </>
        ):(
          <>
          <Link to='notesapp'>Notes</Link>
          <button className='logout-btn' onClick={handleLogout}>logout</button>
          </>
        )}
          </div>
   </nav>
  );
}
