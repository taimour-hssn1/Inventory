// src/components/OrderRecords.jsx

import React, { useState, useEffect } from 'react';
import './OrderRecords.css';
import api from '../api';

const OrderRecords = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/api/orders/');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
        const results = orders.filter(order =>
            order.customer_name.toLowerCase().includes(lowerSearch) ||
            order.id.toString().includes(lowerSearch) ||
            order.items.some(item =>
                item.item.name.toLowerCase().includes(lowerSearch)
            )
        );
        setFilteredOrders(results);
    }, [orders, searchTerm]);

    return (
        <div className="order-records-section">
            <h2>All Placed Orders</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search orders by customer, item, or ID..."
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
                            <h4>Order #{order.id} for {order.customer_name}</h4>
                            <p><strong>Date:</strong> {new Date(order.purchase_date).toLocaleString()}</p>
                            <p><strong>Total:</strong> PKR {order.total_amount}</p>
                            <p><strong>Remaining:</strong> PKR {order.remaining_amount}</p>
                            <p><strong>Paid:</strong> {order.is_paid ? 'Yes' : 'No'}</p>

                            <h5>Items:</h5>
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.id}>
                                        {item.item.name} x {item.quantity} — PKR {item.amount}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderRecords;
