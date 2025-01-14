import React, { useEffect, useState } from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
     const [user,setUser]=useState<string|null>(null);
     const navigate=useNavigate();

     useEffect(()=>{
      const person=sessionStorage.getItem('userName');
      setUser(person);
     },[]);

     const handleLogout=()=>{
      sessionStorage.clear(); 
      localStorage.setItem("logout", Date.now().toString());
      setUser(null);
      navigate('/');
     }
     
     
  return (
    <div> 
        <nav className="navbar">
        <div className="navbar-logo">Studify</div>
        <ul className="navbar-links">
          <li><a href="/" className='ele'>Home</a></li>
          <li><a href="/about" className='ele'>About</a></li>
          <li><a href="#branches" className='ele'>Branches</a></li>
          <li><a href="#contact" className='ele'>Contact</a></li>
          {!user ?(
          <li><a href="/login" className='login'>LOGIN</a></li>):
          (
            <>
            <li><a href="/account" className='login' >My Account</a></li>
            <li><a className='login' onClick={handleLogout}>LOGOUT</a></li>
            </>
          )
}
        </ul>
          
      </nav>
    </div>
  )
}

export default Navbar