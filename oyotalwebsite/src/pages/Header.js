import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ showFindHospitals = false, showLogin = false, showDashboards = true }) {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo">
          <span className="heart-icon">❤️</span>
          <span className="logo-text">OYO-tal</span>
        </Link>
      </div>

      <div className="nav-links">
        {showFindHospitals && (
          <Link to="/find-hospitals" className="nav-link">Find Hospitals</Link>
        )}

        <Link to="/" className="nav-link back-link">Back to Home</Link>

        {showLogin && (
          <div className="auth-buttons">
            <Link to="/login" className="login-button">Log in</Link>
            <Link to="/admin-login" className="admin-login-button">Admin Login</Link>
          </div>
        )}

        {showDashboards && (
          <div className="dashboard-buttons">
            <Link to="/admin-dashboard" className="dashboard-button">Admin Dashboard</Link>
            <Link to="/user-dashboard" className="dashboard-button">User Dashboard</Link>
          </div>
        )}

        <div className="footer-links">
          <Link to="/about" className="footer-link">About Us</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
