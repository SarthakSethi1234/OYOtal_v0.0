import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './AdminLoginPage.css';

function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle admin login logic here
    console.log('Admin login attempt with:', { email, password });
  };

  return (
    <div className="admin-login-page">
      <Header />
      
      <main className="admin-login-container">
        <div className="admin-login-form-container">
          <div className="admin-login-form-content">
            <h1 className="admin-login-heading">Admin Login</h1>
            <p className="admin-login-subheading">Sign in to your admin account</p>
            
            <form onSubmit={handleSubmit} className="admin-login-form">
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
                <div className="password-header">
                  <label htmlFor="password">Password</label>
                  <Link to="/admin-forgot-password" className="forgot-password">
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="admin-sign-in-button">
                Sign In
              </button>
            </form>
            
            <p className="admin-create-account-prompt">
              Need an admin account? <Link to="/admin-signup" className="admin-create-account-link">Register here</Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default AdminLoginPage;