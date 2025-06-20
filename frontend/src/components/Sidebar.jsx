import React from 'react';
import './Sidebar.css';
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers, // This icon will represent our Customer section
  FaDollarSign,
  FaChartLine,
  FaFileAlt,
  FaCog
} from 'react-icons/fa';

// Props:
// - activeItem: string (the name of the currently active menu item, e.g., 'Customer')
// - onMenuItemClick: function (callback when a menu item is clicked)
const Sidebar = ({ activeItem, onMenuItemClick }) => {
  const sidebarItems = [
    { name: 'Home', icon: <FaHome /> },
    { name: 'Inventory', icon: <FaBoxOpen /> },
    { name: 'Orders', icon: <FaShoppingCart /> },
    { name: 'Customer', icon: <FaUsers /> }, 
    { name: 'Revenue', icon: <FaDollarSign /> },
  ];

  return (
    <div className="sidebar">
      <ul>
        {sidebarItems.map((item) => (
          <li
            key={item.name}
            className={activeItem === item.name ? 'active' : ''}
            onClick={() => onMenuItemClick(item.name)} // Pass the item name back
          >
            <a href="#" onClick={(e) => e.preventDefault()}> {/* Prevent default link behavior */}
              <span className="icon">{item.icon}</span>
              <span className="text">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;