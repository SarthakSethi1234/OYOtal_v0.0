import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Search, Clock, MapPin, Calendar } from 'react-feather';
import './HomePage.css'; // Assuming you merge the CSS files into one

function HomePage() {
  const handleSearchClick = () => {
    // Redirect to login page when search is clicked
    window.location.href = '/login';
  };

  return (
    <div className="home-page">
      <Header showFindHospitals={true} showLogin={true} />
      
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="why-choose-us">
            <button className="why-choose-button">Why Choose Us</button>
          </div>
          
          <h1 className="main-heading">The smarter way to find healthcare</h1>
          <p className="sub-heading">
            Our platform provides real-time information to help patients make informed decisions about their healthcare visits.
          </p>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="feature-card">
            <div className="feature-icon">
              <Clock size={24} />
            </div>
            <h2 className="feature-title">Real-time Wait Times</h2>
            <p className="feature-description">
              View current wait times at hospitals near you, updated in real-time.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <MapPin size={24} />
            </div>
            <h2 className="feature-title">Find Nearby Hospitals</h2>
            <p className="feature-description">
              Locate the closest hospitals with the specific medical specialties you need.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Calendar size={24} />
            </div>
            <h2 className="feature-title">Easy Booking</h2>
            <p className="feature-description">
              Book your appointment in just a few clicks and skip the waiting line.
            </p>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <h2 className="cta-heading">Ready to skip the queue?</h2>
          <p className="cta-subheading">
            Join thousands of patients who are making smarter healthcare choices.
          </p>
          <Link to="/find-hospitals" className="cta-button">
            Find a Hospital Now
          </Link>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default HomePage;