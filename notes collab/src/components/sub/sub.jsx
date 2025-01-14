import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Sub.css";

const Sub = () => {
  const { title, subject } = useParams();
  const [data, setData] = useState([]);

  const getfiles = async () => {
    try {
      const response = await fetch(`http://localhost:8000/uploadfiles/getfiles/${subject}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      setData(res.data || []);  
       
    } catch (error) {
      console.error("Error fetching files:", error);
      setData([]); 
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/uploadfiles/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setData((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, likes: data.file.likes } : item
          )
        );
       
      } else {
        console.error("Error updating like:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handlefav=async (fileId)=>{
    try{
      const userId=sessionStorage.getItem('userId');
      const response = await fetch(`http://localhost:8000/uploadfiles/favourites/${fileId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const res=await response.json();
      toast.success(res.message)
      console.log(res);
    }
    catch(err){
      console.log(err);
    }
  }

 
  useEffect(() => {
    getfiles();
  }, []);

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="container">
        <h2>Files for Subject: {subject}</h2>

        {Array.isArray(data) && data.length === 0 && <p>No files found for this subject.</p>}

        <div className="grid">
          {Array.isArray(data) &&
            data.map((file, index) => (
              <div key={index} className="file-card">
                <h3>Title: {file.title || "File Name"}</h3>
                <p>{file.description || "No description available."}</p>
                <a href={`http://localhost:8000/files/${file.pdf}`} target="_blank" rel="noopener noreferrer">
                  Download
                </a>
                <div className="actions">
                  <button className="like-btn" onClick={() => handleLike(file._id)}>
                    👍 Like ({file.likes || 0})
                  </button>
                  <button className="favorite-btn" onClick={() => handlefav(file._id)}>
                    {file.isFavorite ? "❤️ Favorited" : "♡ Favorite"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sub;
