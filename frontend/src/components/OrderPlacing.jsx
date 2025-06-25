// src/components/OrderPlacing.jsx

import React, { useState } from 'react';
import { customers, items } from '../assets/dummy'; // Assuming dummyData.js
import './OrderPlacing.css'; // Shared styling with OrderRecords for overall layout if needed

const OrderPlacing = ({ onPlaceOrder }) => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [currentOrderItems, setCurrentOrderItems] = useState([]);

    const handleCustomerChange = (customerId) => {
        const customer = customers.find(c => c.id === parseInt(customerId));
        setSelectedCustomer(customer);
    };

    const handleAddItemToOrder = (itemId) => {
        const itemToAdd = items.find(item => item.id === parseInt(itemId));
        const existingItemIndex = currentOrderItems.findIndex(item => item.itemId === parseInt(itemId));

        if (existingItemIndex > -1) {
            const updatedItems = [...currentOrderItems];
            updatedItems[existingItemIndex].quantity += 1;
            setCurrentOrderItems(updatedItems);
        } else {
            setCurrentOrderItems([...currentOrderItems, { itemId: itemToAdd.id, quantity: 1 }]);
        }
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        setCurrentOrderItems(prevItems =>
            prevItems.map(item =>
                item.itemId === itemId
                    ? { ...item, quantity: parseInt(newQuantity) || 0 }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const calculateOrderTotal = () => {
        let total = 0;
        currentOrderItems.forEach(orderItem => {
            const itemDetails = items.find(item => item.id === orderItem.itemId);
            if (itemDetails) {
                total += itemDetails.price * orderItem.quantity;
            }
        });
        return total;
    };

    const handlePlaceOrder = () => {
        if (!selectedCustomer) {
            alert("Please select a customer first.");
            return;
        }
        if (currentOrderItems.length === 0) {
            alert("Please add items to the order.");
            return;
        }

        const newOrder = {
            id: Date.now(), // More robust ID for demonstration
            customerId: selectedCustomer.id,
            customerName: selectedCustomer.name,
            items: currentOrderItems.map(oi => {
                const itemDetail = items.find(item => item.id === oi.itemId);
                return {
                    itemId: oi.itemId,
                    itemName: itemDetail ? itemDetail.name : 'Unknown Item',
                    itemPrice: itemDetail ? itemDetail.price : 0,
                    quantity: oi.quantity
                };
            }),
            total: calculateOrderTotal(),
            orderDate: new Date().toLocaleString()
        };

        onPlaceOrder(newOrder); // Pass the new order up to the parent

        // Reset for next order
        setSelectedCustomer(null);
        setCurrentOrderItems([]);
        alert("Order Placed Successfully!");
    };

    return (
        <div className="order-placing-section">
            <h2>Place New Order</h2>

            <div className="customer-selection">
                <h3>Select Customer:</h3>
                <select
                    value={selectedCustomer ? selectedCustomer.id : ''}
                    onChange={(e) => handleCustomerChange(e.target.value)}
                >
                    <option value="">-- Choose Customer --</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
                {selectedCustomer && <p>Selected Customer: <strong>{selectedCustomer.name}</strong></p>}
            </div>

            <hr />

            <div className="item-selection">
                <h3>Add Items to Order:</h3>
                <div className="item-list">
                    {items.map(item => (
                        <div key={item.id} className="item-card">
                            <span>{item.name} (PKR {item.price})</span>
                            <button onClick={() => handleAddItemToOrder(item.id)}>Add</button>
                        </div>
                    ))}
                </div>

                {currentOrderItems.length > 0 && (
                    <div className="selected-items-preview">
                        <h4>Items in Current Order:</h4>
                        <ul>
                            {currentOrderItems.map(orderItem => {
                                const itemDetail = items.find(item => item.id === orderItem.itemId);
                                return (
                                    <li key={orderItem.itemId}>
                                        {itemDetail.name} (PKR {itemDetail.price}) x
                                        <input
                                            type="number"
                                            min="1"
                                            value={orderItem.quantity}
                                            onChange={(e) => handleQuantityChange(orderItem.itemId, e.target.value)}
                                            style={{ width: '60px', marginLeft: '5px' }}
                                        />
                                        <button onClick={() => handleQuantityChange(orderItem.itemId, 0)} style={{ marginLeft: '10px' }}>Remove</button>
                                    </li>
                                );
                            })}
                        </ul>
                        <p>Current Order Total: <strong>PKR {calculateOrderTotal()}</strong></p>
                    </div>
                )}
            </div>

            <hr />

            <button className="place-order-button" onClick={handlePlaceOrder} disabled={!selectedCustomer || currentOrderItems.length === 0}>
                Place Order
            </button>
        </div>
    );
};

export default OrderPlacing;