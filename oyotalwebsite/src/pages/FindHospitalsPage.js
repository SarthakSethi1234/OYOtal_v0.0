import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Search } from 'react-feather';
import './FindHospitalsPage.css';

function FindHospitalsPage() {
  const handleSearchClick = () => {
    // Redirect to login page when search is clicked
    window.location.href = '/login';
  };

  return (
    <div className="find-hospitals-page">
      <Header showLogin={true} />
      
      <main className="find-hospitals-container">
        <div className="find-hospitals-content">
          <h1 className="find-hospitals-heading">
            <span className="heading-dark">Find and Book</span>
            <span className="heading-blue">Hospital Appointments</span>
          </h1>
          
          <p className="find-hospitals-subheading">
            Skip the queue. Book appointments at the best hospitals near you.
          </p>
          
          <div className="search-container" onClick={handleSearchClick}>
            <div className="search-bar">
              <Search className="search-icon" size={20} />
              <span className="search-text">
                Click here to find out the best hospitals in no time by skipping the queue
              </span>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default FindHospitalsPage;