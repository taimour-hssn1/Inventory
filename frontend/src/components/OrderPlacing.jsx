// src/components/OrderPlacing.jsx

import React, { useState } from "react";
// import { customers, items } from '../assets/dummy'; // Assuming dummyData.js
import "./OrderPlacing.css"; // Shared styling with OrderRecords for overall layout if needed
import api from "../api"; // assuming api has JWT/auth setup
import { useEffect } from "react";

const OrderPlacing = ({ onPlaceOrder }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentOrderItems, setCurrentOrderItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const customerRes = await api.get("/api/customers/");
        const itemRes = await api.get("/api/items/");
        setCustomers(customerRes.data);
        setItems(itemRes.data);
      } catch (err) {
        console.error("Failed to fetch customers or items:", err);
        setMessage("Failed to load data. Please check your server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCustomerChange = (customerId) => {
    if (!customerId || customerId === "") {
      setSelectedCustomer(null);
    } else {
      const customer = customers.find((c) => c.id === parseInt(customerId));
      setSelectedCustomer(customer);
    }
    setMessage("");
  };

  const handleAddItemToOrder = (itemId) => {
    const itemToAdd = items.find((item) => item.id === parseInt(itemId));
    const existingItemIndex = currentOrderItems.findIndex(
      (item) => item.itemId === parseInt(itemId)
    );

    if (existingItemIndex > -1) {
      const updatedItems = [...currentOrderItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCurrentOrderItems(updatedItems);
    } else {
      setCurrentOrderItems([
        ...currentOrderItems,
        { itemId: itemToAdd.id, quantity: 1 },
      ]);
    }
    setMessage("");
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCurrentOrderItems(
      (prevItems) =>
        prevItems.map((item) =>
          item.itemId === itemId
            ? { ...item, quantity: parseInt(newQuantity) || 0 }
            : item
        )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCurrentOrderItems((prevItems) =>
      prevItems.filter((item) => item.itemId !== itemId)
    );
  };

  const calculateOrderTotal = () => {
    let total = 0;
    currentOrderItems.forEach((orderItem) => {
      const itemDetails = items.find((item) => item.id === orderItem.itemId);
      if (itemDetails) {
        total += itemDetails.price * orderItem.quantity;
      }
    });
    return total;
  };

  const handlePlaceOrder = async () => {
    if (!selectedCustomer) {
      setMessage("Please select a customer first.");
      return;
    }
    if (currentOrderItems.length === 0) {
      setMessage("Please add items to the order.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const newOrder = {
        customer_name: selectedCustomer.name,
        phone: selectedCustomer.phone || "",
        address: selectedCustomer.address || "",
        items: currentOrderItems.map((oi) => ({
          item_id: oi.itemId,
          quantity: oi.quantity,
        })),
      };

      const response = await api.post("/api/order-dispatch/", newOrder);

      setSelectedCustomer(null);
      setCurrentOrderItems([]);
      setMessage("Order Placed Successfully! 🎉");

    } catch (err) {
      console.error("Failed to place order:", err);
      console.error("Backend error:", err.response?.data);
      setMessage("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && customers.length === 0) {
    return (
      <div className="order-placing-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-placing-container">
      <div className="order-header">
        <h2>Place New Order</h2>
        <p>Create a new order for your customers</p>
      </div>

      {message && (
        <div className={`message ${message.includes('Successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="order-sections">
        {/* Customer Selection Section */}
        <div className="order-section customer-section">
          <div className="section-header">
            <h3>👤 Select Customer</h3>
            <p>Choose a customer for this order</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="customer-select">Customer</label>
            <select
              id="customer-select"
              value={selectedCustomer ? selectedCustomer.id.toString() : ""}
              onChange={(e) => handleCustomerChange(e.target.value)}
              className="customer-select"
            >
              <option value="">-- Choose Customer --</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {selectedCustomer && (
            <div className="selected-customer-info">
              <div className="customer-card">
                <h4>{selectedCustomer.name}</h4>
                <div className="customer-details">
                  <span>📞 {selectedCustomer.phone}</span>
                  {selectedCustomer.address && (
                    <span>📍 {selectedCustomer.address}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Item Selection Section */}
        <div className="order-section items-section">
          <div className="section-header">
            <h3>🛍️ Add Items to Order</h3>
            <p>Select items and quantities for the order</p>
          </div>

          <div className="items-grid">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="item-price">PKR {item.price}</p>
                  <p className="item-stock">Stock: {item.quantity || 0}</p>
                </div>
                <button 
                  className="btn btn-primary add-item-btn"
                  onClick={() => handleAddItemToOrder(item.id)}
                  disabled={!selectedCustomer}
                >
                  <span>➕</span>
                  Add to Order
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Current Order Preview */}
        {currentOrderItems.length > 0 && (
          <div className="order-section order-preview-section">
            <div className="section-header">
              <h3>📋 Current Order</h3>
              <p>Review and modify your order items</p>
            </div>

            <div className="order-items-list">
              {currentOrderItems.map((orderItem) => {
                const itemDetail = items.find(
                  (item) => item.id === orderItem.itemId
                );
                return (
                  <div key={orderItem.itemId} className="order-item-card">
                    <div className="item-details">
                      <h4>{itemDetail.name}</h4>
                      <p className="item-price">PKR {itemDetail.price} each</p>
                    </div>
                    
                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(orderItem.itemId, orderItem.quantity - 1)}
                          disabled={orderItem.quantity <= 1}
                        >
                          ➖
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={orderItem.quantity}
                          onChange={(e) =>
                            handleQuantityChange(orderItem.itemId, e.target.value)
                          }
                          className="quantity-input"
                        />
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(orderItem.itemId, orderItem.quantity + 1)}
                        >
                          ➕
                        </button>
                      </div>
                      
                      <div className="item-total">
                        PKR {itemDetail.price * orderItem.quantity}
                      </div>
                      
                      <button
                        className="btn btn-danger remove-item-btn"
                        onClick={() => handleRemoveItem(orderItem.itemId)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="order-summary">
              <div className="total-section">
                <h3>Order Total</h3>
                <div className="total-amount">PKR {calculateOrderTotal()}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Place Order Button */}
      <div className="order-actions">
        <button
          className="btn btn-success place-order-btn"
          onClick={handlePlaceOrder}
          disabled={!selectedCustomer || currentOrderItems.length === 0 || isLoading}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner-small"></div>
              Processing...
            </>
          ) : (
            <>
              <span>🚀</span>
              Place Order
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OrderPlacing;
