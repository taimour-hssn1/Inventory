// src/components/OrderManager.jsx

import React, { useState } from "react";
import OrderPlacing from "./OrderPlacing";
import OrderRecords from "./OrderRecords";
import "./OrderManager.css"; // For overall layout

const OrderManager = () => {
  const [placedOrders, setPlacedOrders] = useState([]);

  const handleNewOrderPlaced = (newOrder) => {
    setPlacedOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  return (
    <div className="order-manager-container">
      <h1>Order Management System</h1>
      <div className="content-wrapper">
        {/* This is the parent for side-by-side */}
        <OrderPlacing onPlaceOrder={handleNewOrderPlaced} />
        <hr className="component-separator" /> {/* Optional separator */}
        <OrderRecords orders={placedOrders} />
      </div>
    </div>
  );
};

export default OrderManager;
