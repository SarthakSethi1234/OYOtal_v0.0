import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../pages/Header';
import Footer from '../pages/Footer';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would validate credentials against a backend
    console.log('Login attempt with:', { email, password });
    
    // For demo purposes, redirect to user dashboard
    navigate('/user-dashboard');
  };

  return (
    <div className="login-page">
      <Header />
      
      <main className="login-container">
        <div className="login-form-container">
          <div className="login-form-content">
            <h1 className="login-heading">Welcome Back</h1>
            <p className="login-subheading">Sign in to your account to continue</p>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <div className="password-header">
                  <label htmlFor="password">Password</label>
                  <Link to="/forgot-password" className="forgot-password">
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
              
              <button type="submit" className="sign-in-button">
                Sign In
              </button>
            </form>
            
            <p className="create-account-prompt">
              Don't have an account? <Link to="/signup" className="create-account-link">Create an account</Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default LoginPage;