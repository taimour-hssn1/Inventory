// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';
import {
  FaHome,
  FaBoxOpen,
  FaCartPlus, 
  FaClipboardList,
  FaUsers,
  FaDollarSign,
  FaSignOutAlt,
    FaMoneyCheckAlt,
} from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();

const navItems = [
  { name: 'Home', icon: <FaHome />, path: '/dashboard/' },
  { name: 'Inventory', icon: <FaBoxOpen />, path: '/dashboard/inventory' },
  { name: 'Place Order', icon: <FaCartPlus />, path: '/dashboard/orders/place' },
  { name: 'View Orders', icon: <FaClipboardList />, path: '/dashboard/orders/view' },
  { name: 'Customer', icon: <FaUsers />, path: '/dashboard/customer' },
  { name: 'Revenue', icon: <FaDollarSign />, path: '/dashboard/revenue' },
  { name: 'Installments', icon: <FaMoneyCheckAlt />, path: '/dashboard/installments' },
];

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setToken(null);
    navigate('/', { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>Taimour Traders</h2>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink to={item.path} className={({ isActive }) => isActive ? 'active' : ''}>
                <span className="icon">{item.icon}</span> {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </nav>
  );
};

export default Navbar;
