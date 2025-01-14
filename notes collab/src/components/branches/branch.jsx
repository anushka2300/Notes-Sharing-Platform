import React from "react";
import Card from "../branchCard/card";
import './branch.css'
import Navbar from "../navbar/navbar";

const branches = [
  { title: "Computer Science and Engineering", icon: "🔍", description: "Explore CS." },
  { title: "Information Technology", icon: "💻", description: "Explore IT." },
  { title: "Electrical and Electronics Engineering", icon: "🪫", description: "Explore EEE." },
  { title: "Electronics and Communication Engineering", icon: "⚙️", description: "Explore ECE." },
  { title: "Mechanical Engineering", icon: "🦾", description: "Explore Mechanical." },
  { title: "Civil Engineering", icon: "🌉", description: "Explore Civil." },
  { title: "Chemical Engineering", icon: "🧪", description: "Explore Chemical." },
  { title: "Aerospace Engineering", icon: "✈️", description: "Explore Aerospace." },
  { title: "Automobile Engineering", icon: "🚗", description: "Explore Automobile." },
  { title: "Metallurgical and Materials Engineering", icon: "🧇", description: "Explore Metallurgical and Materials." },

];

const Branch = () => {
  return (
    <>
    <Navbar/>
    <div className="app">
      <header className="header">
        <h1>BTech Branches</h1>
      </header>
      <div className="branch-container">
        {branches.map((branch, index) => (
          <Card
            key={index}
            title={branch.title}
            icon={branch.icon}
            description={branch.description}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default Branch;
