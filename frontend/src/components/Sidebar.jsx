import React from 'react';
import './Sidebar.css';
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaSignOutAlt,
} from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ setToken }) => {
  const navigate = useNavigate();

  const sidebarItems = [
    { name: 'Home', icon: <FaHome />, path: '/dashboard/' },
    { name: 'Inventory', icon: <FaBoxOpen />, path: '/dashboard/inventory' },
    { name: 'Orders', icon: <FaShoppingCart />, path: '/dashboard/orders' },
    { name: 'Customer', icon: <FaUsers />, path: '/dashboard/customer' },
    { name: 'Revenue', icon: <FaDollarSign />, path: '/dashboard/revenue' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setToken(null);
    navigate('/', { replace: true });
  };

  return (
    <div className="sidebar">
      <ul>
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <NavLink to={item.path} className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="icon">{item.icon}</span>
              <span className="text">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className="logout-item">
        <li onClick={handleLogout}>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <span className="icon"><FaSignOutAlt /></span>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
