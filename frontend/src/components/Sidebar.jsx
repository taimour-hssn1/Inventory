import React from 'react';
import './Sidebar.css';
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaSignOutAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // <--- Make sure this is imported!

// Props:
// - activeItem: string (the name of the currently active menu item, e.g., 'Customer')
// - onMenuItemClick: function (callback when a menu item is clicked)
const Sidebar = ({ activeItem, onMenuItemClick }) => {
  const navigate = useNavigate(); // <--- Initialize the useNavigate hook here!

  const sidebarItems = [
    { name: 'Home', icon: <FaHome /> },
    { name: 'Inventory', icon: <FaBoxOpen /> },
    { name: 'Orders', icon: <FaShoppingCart /> },
    { name: 'Customer', icon: <FaUsers /> },
    { name: 'Revenue', icon: <FaDollarSign /> },
    // Removed 'Logout' from sidebarItems to give it a distinct styling and position
    // and to handle its click separately.
  ];

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/', { replace: true }); // Redirect to login page and clear history
  };

  return (
    <div className="sidebar">
      <ul>
        {sidebarItems.map((item) => (
          <li
            key={item.name}
            className={activeItem === item.name ? 'active' : ''}
            onClick={() => onMenuItemClick(item.name)}
          >
            <a href="#" onClick={(e) => e.preventDefault()}>
              <span className="icon">{item.icon}</span>
              <span className="text">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Separate ul for the logout item to push it to the bottom and style differently */}
      <ul className="logout-item">
        <li onClick={handleLogout}> {/* Attach handleLogout directly to the li */}
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