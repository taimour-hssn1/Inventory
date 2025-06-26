import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [typedTitle, setTypedTitle] = useState('');
  const navigate = useNavigate();

  const fullTitle = 'Taimour Traders';

useEffect(() => {
  let index = -1;
  const interval = setInterval(() => {
    if (index < fullTitle.length-1) {
      index++;
      setTypedTitle((prev) => prev + fullTitle[index]);
    } else {
      clearInterval(interval);
    }
  }, 125); // adjust speed if needed

  return () => clearInterval(interval);
}, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/token/', { username, password });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      setToken(res.data.access);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <h2>{typedTitle}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
