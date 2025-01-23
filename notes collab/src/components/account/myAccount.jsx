import React, { useState,useEffect } from 'react'
import Navbar from "../navbar/navbar"
import "./account.css"
import { FaUpload } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { GrFavorite } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { Outlet } from 'react-router-dom'
 
const myAccount = () => {

  const [use,setUse]=useState("");

  const user=async ()=>{
    const token = sessionStorage.getItem("token");
    try{
      const response=await fetch("http://localhost:8000/auth/getuser",{
        headers: {
          Authorization: `Bearer ${token}`,  
      },
      }
  )
  const res=await response.json();
  console.log(res.user);
  setUse(res.user.name.toUpperCase());
  }
  catch(err){
    console.error("Error fetching user:", err);
  }
}

useEffect(() => {
  user(); 
}, []);

  return (
    <div> 
        <Navbar/>
        <aside className="sidebar">

        <div className="profile">
          <h2>{use}</h2>
          <p>Engineering Student</p>
        </div>
        <ul className="menu">
          <li><a href="/account/notes"> <span className="icon"><FaUpload /></span>     Upload Notes</a></li>
          <li><a href="/account/mynotes"><span className="icon"><GrNotes /></span> My Notes</a></li>
          <li><a href="/account/favorites"><span className="icon"><GrFavorite /> </span>Favorites</a></li>
          <li><a href="/account/settings"><span className="icon"><IoSettingsOutline /></span>  Settings</a></li>
        </ul>
      </aside>
      
       
      <main className="main-content">
          <h1 className='head'>Welcome to My university</h1>
          <Outlet />
        </main>

    </div>
  )
}

export default myAccount