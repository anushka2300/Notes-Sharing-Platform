import React, { useEffect, useState } from 'react'

const Account = () => {
    const [title,setTitle]=useState("");
    const [file,SetFile]=useState("");
    const [allFiles,setAllFiles]=useState(null);
 

    const submit=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("title",title);
        formData.append("file",file);
        try{
          const response=await fetch("http://localhost:8000/uploadfiles/uploadfile",{
            method:"POST",
            body: formData, 
          
          })
          const res=await response.json();
          console.log(res);
        }
        catch(err){
          console.error("Error uploading file:", err);
        }
    }

    useEffect(()=>{
      getfiles()
    },[])

    const getfiles=async ()=>{
      try{
      const response=await fetch("http://localhost:8000/uploadfiles/getfiles",{
            method:"GET",
          })
        const res=await response.json();
        if (res.status === "ok") {
          setAllFiles(res.data);
          console.log(res.data);
        } else {
          console.error("Error fetching files:", res.error);
        }
    }
    catch(err){
      console.error("Error fetching files:", err);
    }
  }
  return (
    <> 
    <div> 
        <form action="" onSubmit={submit}>
            <h4>Upload pdf</h4>
            <input type="text" onChange={(e)=> setTitle(e.target.value)} placeholder='title'/>
            <input type="file" name="files" id="" onChange={(e)=>SetFile(e.target.files[0])}/>
            <button type='submit'> Submit</button>
        </form>
    </div>
    <div>
      <h4>Uploaded Files:</h4>
      {allFiles && allFiles.length > 0 ? (
        <ul>
          {allFiles.map((file, index) => (
            <li key={index}>
              <strong>Title:</strong> {file.title} <br />
              <a
                href={`http://localhost:8000/files/${file.pdf}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
</>
  )
}

export default Account