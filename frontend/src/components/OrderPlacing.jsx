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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerRes = await api.get("/api/customers/");
        const itemRes = await api.get("/api/items/");
        setCustomers(customerRes.data);
        setItems(itemRes.data);
      } catch (err) {
        console.error("Failed to fetch customers or items:", err);
        alert("Failed to load data. Please check your server.");
      }
    };

    fetchData();
  }, []);

  const handleCustomerChange = (customerId) => {
    const customer = customers.find((c) => c.id === parseInt(customerId));
    setSelectedCustomer(customer);
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
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCurrentOrderItems(
      (prevItems) =>
        prevItems.map((item) =>
          item.itemId === itemId
            ? { ...item, quantity: parseInt(newQuantity) || 0 }
            : item
        )
      // .filter((item) => item.quantity > 0)
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
      alert("Please select a customer first.");
      return;
    }
    if (currentOrderItems.length === 0) {
      alert("Please add items to the order.");
      return;
    }

    try {
      // Construct order payload
      const newOrder = {
        customer_name: selectedCustomer.name,
        phone: selectedCustomer.phone || "", // optional
        address: selectedCustomer.address || "", // optional
        items: currentOrderItems.map((oi) => ({
          item_id: oi.itemId,
          quantity: oi.quantity,
        })),
      };

      // Send order to backend (adjust URL if needed)
      const response = await api.post("/api/order-dispatch/", newOrder);

      // Clear form
      setSelectedCustomer(null);
      setCurrentOrderItems([]);
      alert("Order Placed Successfully!");


    } catch (err) {
      console.error("Failed to place order:", err);
      console.error("Backend error:", err.response?.data);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="order-placing-section">
      <h2>Place New Order</h2>

      <div className="customer-selection">
        <h3>Select Customer:</h3>
        <select
          value={selectedCustomer ? selectedCustomer.id : ""}
          onChange={(e) => handleCustomerChange(e.target.value)}
        >
          <option value="">-- Choose Customer --</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        {selectedCustomer && (
          <p>
            Selected Customer: <strong>{selectedCustomer.name}</strong>
          </p>
        )}
      </div>

      <hr />

      <div className="item-selection">
        <h3>Add Items to Order:</h3>
        <div className="item-list">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <span>
                {item.name} (PKR {item.price})
              </span>
              <button onClick={() => handleAddItemToOrder(item.id)}>Add</button>
            </div>
          ))}
        </div>

        {currentOrderItems.length > 0 && (
          <div className="selected-items-preview">
            <h4>Items in Current Order:</h4>
            <ul>
              {currentOrderItems.map((orderItem) => {
                const itemDetail = items.find(
                  (item) => item.id === orderItem.itemId
                );
                return (
                  <li key={orderItem.itemId}>
                    {itemDetail.name} (PKR {itemDetail.price}) x
                    <input
                      type="number"
                      min="1"
                      value={orderItem.quantity}
                      onChange={(e) =>
                        handleQuantityChange(orderItem.itemId, e.target.value)
                      }
                      style={{ width: "60px", marginLeft: "5px" }}
                    />
                    <button
                      onClick={() => handleRemoveItem(orderItem.itemId)}
                      style={{ marginLeft: "10px" }}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
            <p>
              Current Order Total: <strong>PKR {calculateOrderTotal()}</strong>
            </p>
          </div>
        )}
      </div>

      <hr />

      <button
        className="place-order-button"
        onClick={handlePlaceOrder}
        disabled={!selectedCustomer || currentOrderItems.length === 0}
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderPlacing;
