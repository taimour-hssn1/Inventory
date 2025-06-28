import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { FaUserCircle, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [typedTitle, setTypedTitle] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const fullTitle = 'The StockRoom';

  useEffect(() => {
    let index = -1;
    setTypedTitle('');
    const interval = setInterval(() => {
      if (index < fullTitle.length-1) {
        index++;
        setTypedTitle((prev) => prev + fullTitle[index]);
      } else {
        clearInterval(interval);
      }
    }, 125);
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
    <div className="login-minimal-bg">
      <div className="login-minimal-center">
        <h1 className="login-title-animated">{typedTitle}</h1>
        {error && <div className="login-error-message">{error}</div>}
        <form onSubmit={handleLogin} className="login-minimal-form">
          <div className="input-wrapper">
            <span className="input-icon-left"><FaUserCircle /></span>
            <input
              id="username"
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              style={{ paddingLeft: '2.5rem' }}
            />
            <label htmlFor="username" className={`floating-label${username ? ' filled' : ''}`}>Username</label>
          </div>
          <div className="input-wrapper">
            <span className="input-icon-left"><FaLock /></span>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{ paddingLeft: '2.5rem' }}
            />
            <label htmlFor="password" className={`floating-label${password ? ' filled' : ''}`}>Password</label>
            <span className="toggle-password" onClick={() => setShowPassword((v) => !v)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
