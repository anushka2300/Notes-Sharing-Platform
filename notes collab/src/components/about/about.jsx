import React from 'react';
import Navbar from "../navbar/navbar";
import './about.css';

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div className="outer">
        <section className="intro">
          <h1>Welcome to Our Notes Sharing Platform</h1>
          <p>
            A place where students can upload their notes, share their knowledge, and access the study materials
            from their peers. Whether you're a first-year student or preparing for your final exams, you can find and
            contribute notes that will help you succeed.
          </p>
        </section>

        

        <section className="contact">
          <h2>Get in Touch</h2>
          <p>If you have any questions or suggestions, feel free to reach out to us. We're here to help!</p>
          <a href="/account/settings" className="button">Contact Support</a>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
