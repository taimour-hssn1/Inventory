import React, { useState, useEffect } from "react";
import "./OrderRecords.css";
import api from "../api";

const OrderRecords = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/orders/");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setMessage("Failed to load orders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const results = orders.filter(
      (order) =>
        order.customer_name.toLowerCase().includes(lowerSearch) ||
        order.id.toString().includes(lowerSearch) ||
        order.items.some((item) =>
          item.item.name.toLowerCase().includes(lowerSearch)
        )
    );
    setFilteredOrders(results);
  }, [orders, searchTerm]);

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm(`Are you sure you want to delete order #${orderId}?`))
      return;

    try {
      setIsLoading(true);
      await api.delete(`/api/delete-order/${orderId}/`);
      setOrders(orders.filter((order) => order.id !== orderId));
      setMessage("Order deleted successfully! 🗑️");
    } catch (error) {
      console.error("Error deleting order:", error);
      setMessage("Failed to delete order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    // You can implement edit functionality here
    setMessage("Edit functionality coming soon! ✏️");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (isPaid, remainingAmount) => {
    if (isPaid) return 'paid';
    if (remainingAmount === 0) return 'paid';
    if (remainingAmount < 1000) return 'partial';
    return 'pending';
  };

  const getStatusText = (isPaid, remainingAmount) => {
    if (isPaid || remainingAmount === 0) return 'Paid';
    if (remainingAmount < 1000) return 'Partial';
    return 'Pending';
  };

  if (isLoading && orders.length === 0) {
    return (
      <div className="order-records-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-records-container">
      <div className="records-header">
        <h2>📋 Order Records</h2>
        <p>View and manage all placed orders</p>
      </div>

      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="search-section">
        <div className="search-container">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder="Search orders by customer, item, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="search-stats">
          <span>Showing {filteredOrders.length} of {orders.length} orders</span>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No orders found</h3>
          <p>
            {searchTerm 
              ? "No orders match your search criteria." 
              : "No orders have been placed yet."
            }
          </p>
        </div>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-id">
                  <span className="order-number">#{order.id}</span>
                  <span className={`status-badge ${getStatusColor(order.is_paid, order.remaining_amount)}`}>
                    {getStatusText(order.is_paid, order.remaining_amount)}
                  </span>
                </div>
                <div className="order-date">
                  📅 {formatDate(order.purchase_date)}
                </div>
              </div>

              <div className="customer-info">
                <h4>👤 {order.customer_name}</h4>
              </div>

              <div className="order-summary">
                <div className="summary-item">
                  <span className="label">Total Amount:</span>
                  <span className="value total">PKR {order.total_amount}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Remaining:</span>
                  <span className={`value remaining ${order.remaining_amount > 0 ? 'pending' : 'paid'}`}>
                    PKR {order.remaining_amount}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="label">Payment Status:</span>
                  <span className={`value status ${getStatusColor(order.is_paid, order.remaining_amount)}`}>
                    {getStatusText(order.is_paid, order.remaining_amount)}
                  </span>
                </div>
              </div>

              <div className="order-items">
                <h5>🛍️ Items ({order.items.length})</h5>
                <div className="items-list">
                  {order.items.map((item) => (
                    <div key={item.id} className="item-row">
                      <span className="item-name">{item.item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                      <span className="item-amount">PKR {item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {!order.is_paid && (
                <div className="order-actions">
                  <button
                    onClick={() => handleEditOrder(order)}
                    className="btn btn-primary edit-btn"
                    disabled={isLoading}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="btn btn-danger delete-btn"
                    disabled={isLoading}
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderRecords;
