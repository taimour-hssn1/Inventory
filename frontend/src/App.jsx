import './App.css'; // Main app layout CSS
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import React, { useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('access'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!token ? <LoginPage setToken={setToken} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard/*" element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 