import React, { useEffect, useState } from 'react'
import "./fvrt.css"
const favourites = () => {
  const [fvrt,setFvrt]=useState([]);

const fav=async()=>{
    const token=sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/uploadfiles/getfavourites`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const res=await response.json();
    console.log(res.favourites);
    setFvrt(res.favourites);
  }

  useEffect(()=>{
    fav()
  },[])
  return (
    <div>
       <div className="favourites-container">
      <h1>Your Favourite PDFs</h1>
      <div className="pdf-list">
        {fvrt.length > 0 ? (
          fvrt.map((pdf, index) => (
            <div className="pdf-card" key={index}>
              <h2>{pdf.title}</h2>
              <p>{pdf.description}</p>
              <strong>File Name:</strong>{" "}
                <a
                  href={`http://localhost:8000/files/${pdf.pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {pdf.title}
                </a>
            </div>
          ))
        ) : (
          <p>No favourites found.</p>
        )}
      </div>
    </div>
    </div>
  )
}

export default favourites