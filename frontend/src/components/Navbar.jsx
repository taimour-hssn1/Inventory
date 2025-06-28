// src/components/Navbar.jsx
import React from "react";
import "./Navbar.css";
import {
  FaHome,
  FaBoxOpen,
  FaCartPlus,
  FaClipboardList,
  FaUsers,
  FaDollarSign,
  FaSignOutAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", icon: <FaHome />, path: "/dashboard" },
    { name: "Inventory", icon: <FaBoxOpen />, path: "/dashboard/inventory" },
    {
      name: "Place Order",
      icon: <FaCartPlus />,
      path: "/dashboard/orders/place",
    },
    {
      name: "View Orders",
      icon: <FaClipboardList />,
      path: "/dashboard/orders/view",
    },
    { name: "Customer", icon: <FaUsers />, path: "/dashboard/customer" },
    {
      name: "Installments",
      icon: <FaMoneyCheckAlt />,
      path: "/dashboard/installments",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setToken(null);
    navigate("/", { replace: true });
  };

  const isActiveLink = (path) => {
    if (path === "/dashboard") {
      // For home, only match exact path or dashboard with trailing slash
      return (
        location.pathname === "/dashboard" ||
        location.pathname === "/dashboard/"
      );
    }
    // For other routes, check if current path starts with the nav item path
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>Taimour Traders</h2>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActiveLink(item.path) ? "active" : ""
                }
                end={item.path === "/dashboard"}
              >
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
