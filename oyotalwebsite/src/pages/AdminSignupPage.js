import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './AdminSignupPage.css';

function AdminSignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [hospitalName, setHospitalName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle admin signup logic here
    console.log('Admin signup attempt with:', { fullName, email, phone, password, hospitalName });
  };

  return (
    <div className="admin-signup-page">
      <Header />
      
      <main className="admin-signup-container">
        <div className="admin-signup-form-container">
          <div className="admin-signup-form-content">
            <h1 className="admin-signup-heading">Create Admin Account</h1>
            <p className="admin-signup-subheading">Register as a hospital administrator</p>
            
            <form onSubmit={handleSubmit} className="admin-signup-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="hospitalName">Hospital Name</label>
                <input
                  type="text"
                  id="hospitalName"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Create Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="admin-create-account-button">
                Create Admin Account
              </button>
            </form>
            
            <p className="admin-login-prompt">
              Already have an admin account? <Link to="/admin-login" className="admin-login-link">Sign in</Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default AdminSignupPage;