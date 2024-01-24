import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (email === 'sak@gmail.com' && password === '123123') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="login-container">
      <div className="header-container">
        <img
          src="https://www.truad.co/wp-content/uploads/2023/11/logo_transparent_1-150x150.png"
          alt="TruAd Logo"
          className="logo"
        />
        <span className="brand-text">TruAd</span>
      </div>

      <div className="login-form">
        <h2 className="login-heading">Login</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="button" onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
