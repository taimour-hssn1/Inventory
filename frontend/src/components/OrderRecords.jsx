// src/components/OrderRecords.jsx

import React, { useState, useEffect } from 'react';
import './OrderRecords.css'; // Specific styling for OrderRecords

const OrderRecords = ({ orders }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    // Update filtered orders whenever orders or searchTerm changes
    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const results = orders.filter(order =>
            order.customerName.toLowerCase().includes(lowercasedSearchTerm) ||
            order.items.some(item => item.itemName.toLowerCase().includes(lowercasedSearchTerm)) ||
            order.id.toString().includes(lowercasedSearchTerm)
        );
        setFilteredOrders(results);
    }, [orders, searchTerm]);

    return (
        <div className="order-records-section">
            <h2>All Placed Orders</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search orders by customer name, item, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredOrders.length === 0 ? (
                <p>No orders found matching your criteria.</p>
            ) : (
                <ul className="placed-orders-list">
                    {filteredOrders.map(order => (
                        <li key={order.id} className="placed-order-card">
                            <h4>Order #{order.id} for {order.customerName}</h4>
                            <p>Date: {order.orderDate}</p>
                            <h5>Items:</h5>
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.itemId}>
                                        {item.itemName} x {item.quantity} (PKR {item.itemPrice} each)
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Total: PKR {order.total}</strong></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderRecords;