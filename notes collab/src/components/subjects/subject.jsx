import React from 'react'
import { useNavigate, useParams,Outlet } from 'react-router-dom'
import './subject.css'
import Navbar from '../navbar/navbar'

const Subject = () => {
    const {title}=useParams();
    const navigate=useNavigate();
  
    const subjects = {
      computer_science_and_engineering: [
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
      information_technology: [
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
      electrical_and_electronics_engineering: [
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
      electronics_and_communication_engineering: [
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
      mechanical_engineering: [
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
      civil_engineering: [
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
      chemical_engineering: [
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
      aerospace_engineering: [
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
      automobile_engineering: [
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
      metallurgical_and_materials_engineering: [
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
 const nav=(subject)=>{
  navigate(`/${title}/sub/${subject}`)
 }
    
  
  return (
    <>
    <Navbar/>
    <div>  
         <div className="branch-subjects-container">
      <h1>{title} Branch Subjects</h1>
      
      {subjects[title].length > 0 ? (
        <div className="subjects-grid">
          { subjects[title].map((subject, index) => (
            <div key={index}  onClick={()=>{nav(subject)}} className="subject-card">
              <h3>{subject} </h3> 
            </div>
          ))}
        </div>
      ) : (
        <p>No subjects found for the {title} branch.</p>
      )}
    </div>
    <Outlet/>
    </div>
    </>
  )
}

export default Subject