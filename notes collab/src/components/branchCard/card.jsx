"use client"
import React from 'react'
import './card.css'
const Card = ({title,icon,description}) => {
    const handleClick=()=>{
        window.location.href=`/${title.toLowerCase().replace(/\s+/g, "_")}`
    }
        return (
    <div className="branch-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="details-btn" onClick={handleClick}>Explore</button>
    </div>
  );
};
  
 

export default Card