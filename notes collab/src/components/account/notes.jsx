import React, { useEffect, useState } from 'react'
import './account.css'

const Notes = () => {

    const [title,setTitle]=useState("");
    const [file,SetFile]=useState("");
    const [branch,setBranch]=useState("");
    const [subject,setSubject]=useState("");
    const [description,setDescription]=useState("");
    const branches=[
        "Computer Science and Engineering",
        "Information Technology",
        "Electrical and Electronics Engineering",
        "Electronics and Communication Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Chemical Engineering",
        "Aerospace Engineering",
        "Automobile Engineering",
        "Metallurgical and Materials Engineering"

    ]

    const subjects = {
        "Computer Science and Engineering": [
          "Data Structures and Algorithms",
          "Operating Systems",
          "Database Management Systems",
          "Computer Networks",
          "Software Engineering",
          "Artificial Intelligence",
          "Machine Learning",
          "Web Technologies",
          "Cyber Security",
          "Compiler Design",
          "Cloud Computing",
          "Internet of Things (IoT)",
        ],
       "Information Technology": [
          "Data Structures and Algorithms",
          "Database Management Systems",
          "Web Application Development",
          "Software Engineering",
          "Computer Networks",
          "Mobile Computing",
          "Cloud Computing",
          "Artificial Intelligence",
          "Information Security",
          "Data Analytics",
          "Human-Computer Interaction"
        ],
        "Electrical and Electronics Engineering": [
          "Circuit Theory",
          "Power Systems",
          "Electrical Machines",
          "Control Systems",
          "Power Electronics",
          "Analog and Digital Electronics",
          "Microprocessors and Microcontrollers",
          "Signal Processing",
          "Electromagnetic Theory",
          "Renewable Energy Systems",
          "High Voltage Engineering"
        ],
        "Electronics and Communication Engineering": [
          "Analog and Digital Electronics",
          "Signals and Systems",
          "Microprocessors and Microcontrollers",
          "Communication Systems",
          "Digital Signal Processing",
          "Embedded Systems",
          "VLSI Design",
          "Control Systems",
          "Electromagnetic Theory",
          "Wireless Communication",
          "Optical Communication"
        ],
       "Mechanical Engineering": [
          "Thermodynamics",
          "Fluid Mechanics",
          "Heat Transfer",
          "Strength of Materials",
          "Theory of Machines",
          "Manufacturing Technology",
          "Machine Design",
          "CAD/CAM",
          "Industrial Engineering",
          "Robotics",
          "Automobile Engineering"
        ],
        "Civil Engineering": [
          "Structural Engineering",
          "Geotechnical Engineering",
          "Transportation Engineering",
          "Environmental Engineering",
          "Water Resources Engineering",
          "Surveying",
          "Building Materials and Construction",
          "Concrete Technology",
          "Hydrology and Irrigation",
          "Foundation Engineering"
        ],
       "Chemical Engineering": [
          "Chemical Process Principles",
          "Chemical Reaction Engineering",
          "Thermodynamics",
          "Heat and Mass Transfer",
          "Fluid Mechanics",
          "Process Control and Instrumentation",
          "Industrial Chemistry",
          "Biochemical Engineering",
          "Environmental Engineering",
          "Petrochemical Technology"
        ],
        "Aerospace Engineering": [
          "Aerodynamics",
          "Aircraft Structures",
          "Flight Mechanics",
          "Propulsion Systems",
          "Avionics",
          "Spacecraft Technology",
          "Fluid Mechanics",
          "Thermodynamics",
          "Aircraft Design",
          "Satellite Communication",
          "Computational Fluid Dynamics (CFD)"
        ],
        "Automobile Engineering": [
          "Automotive Engines",
          "Vehicle Dynamics",
          "Automobile Transmission",
          "Chassis and Body Engineering",
          "Fuel and Emission Control",
          "Electric and Hybrid Vehicles",
          "Thermodynamics",
          "Fluid Mechanics",
          "Manufacturing Processes",
          "Automotive Electronics"
        ],
        "Metallurgical and Materials Engineering": [
          "Physical Metallurgy",
          "Extractive Metallurgy",
          "Mechanical Behavior of Materials",
          "Materials Characterization",
          "Thermodynamics of Materials",
          "Heat Treatment of Metals",
          "Corrosion Engineering",
          "Welding Technology",
          "Nanomaterials",
          "Ceramics and Composite Materials"
        ]
      };

    const submit=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("title",title);
        formData.append("branch",branch);
        formData.append("subject",subject);
        formData.append("description",description);
        formData.append("file",file);
        try{
          const token = sessionStorage.getItem('token');
          const response=await fetch("http://localhost:8000/uploadfiles/uploadfile",{
            method:"POST",
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          })
          console.log("Response:", response);

          const res=await response.json();
          setTitle("");
          setBranch("");
          setSubject("");
          setDescription("");
          SetFile(null);
          alert("File uploaded successfully!");
          console.log(res);
        }
        catch(err){
          console.error("Error uploading file:", err);
        }
    }

  return (
    <div className="notes-container">
      <h1 className="notes-title">Upload Your Notes</h1>
      <p className="notes-description">Share your knowledge with others! Fill out the form below to upload your notes and make them accessible to students worldwide.</p>
      
      <form action="" className="box" onSubmit={submit}>

        <div className="form-group">
          <label htmlFor="Branch">Branch:</label>
          <select name="branch" id="branch" className='branch' value={branch} onChange={(e)=> setBranch(e.target.value)}>
            <option value="" disabled>
              Select your branch
            </option>
                 {branches.map((branch, index) => (
                    <option key={index} value={branch}>
                  {branch}
            </option>
                 ))}  
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
         <select name="subject" id="subject" className='subject' value={subject} onChange={(e)=> setSubject(e.target.value)}>
            <option value=""  disabled>
                select the subject
            </option>
            {branch &&
              subjects[branch]?.map((sub, id) => (
                <option key={id} value={sub} >
                  {sub}
                </option>
              ))}
           
         </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title of Notes:</label>
          <input type="text" id="title" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Enter a descriptive title for your notes" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} rows="4" onChange={(e)=> setDescription(e.target.value)} placeholder="Add a brief description about the content of your notes"></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="file">Upload Your Notes:</label>
          <input type="file" name="file" id="file"  onChange={(e)=>SetFile(e.target.files[0])}/>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Notes;
