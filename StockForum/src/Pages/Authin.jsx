// page to authenticate users
import React from 'react';
import { useState } from 'react';
import '../CSS_Styles/Authen.css'; // Assuming you have a CSS file for styling
import { Link, useNavigate } from 'react-router';
import supabase from "../Client";

// create a functional component for the authentication page
const Authin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle authentication logic here
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    }); 
    if (error) {
      console.error('Error logging in:', error);
      alert('Error logging in: ' + error.message);
    } else {
      console.log('User logged in successfully:', data);
      // Redirect to the chat forum or home page after successful login
      window.location.href = '/'; // Adjust the path as needed
    }
  };

  return (
    <div className="auth-container">
        {/* Header for the authentication page */}
      <div className="header">
        <h1>BITE-IN</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link to="/App">
          <button type="submit">Login</button>
        </Link>
      </form>
        <div className="register-link">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
  </div>
    );
};

export default Authin;