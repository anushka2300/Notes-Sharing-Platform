import React, { useEffect,useState } from 'react'
import './myupload.css'
const myUploads = () => {
      const [uploads, setUploads] = useState([]);

      const getfiles=async ()=>{
        const token = sessionStorage.getItem('token');
          try{
            const response=await fetch("http://localhost:8000/uploadfiles/getfiles",{
              headers: {
                Authorization: `Bearer ${token}`,  
            },
            }
            )
            const res=await response.json();  
            setUploads(res.data);
          }
          catch(err){
            console.log("error found while file access ",err);
          }
      }

      const deleteFile = async (fileId) => {
        try {
            const token = sessionStorage.getItem("token");  
            const response = await fetch(`http://localhost:8000/uploadfiles/removefiles/${fileId}`, {
              method: "DELETE",
              headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json"
              },
          });
          if(response.ok){
            alert("File deleted successfully");
            getfiles();  
          }
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

      useEffect(()=>{
        getfiles()
      },[])
  return (
    <div> 
      <div className="container">
      <h1 className="heading">My Uploads</h1>
      <div className="list">
        {uploads.length > 0 ? (
          uploads.map((upload) => (
            <div key={upload._id} className="card">
              <h2 className="branch">{upload.branch}</h2>
              <p>
                <strong>Subject:</strong> {upload.subject}
              </p>
              <p>
                <strong>Description:</strong> {upload.description}
              </p>
              <p>
                <strong>File Name:</strong>{" "}
                <a
                  href={`http://localhost:8000/files/${upload.pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {upload.title}
                </a>
              </p>
              <button className='remove' onClick={() => deleteFile(upload._id)}>Remove</button>
            </div>
          ))
        ) : (
          <p className="no-uploads">No uploads available.</p>
        )}
      </div>
    </div>
    </div>
  )
}

export default myUploads