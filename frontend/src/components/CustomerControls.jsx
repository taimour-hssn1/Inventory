import React from 'react';
import './CustomerControls.css';

const CustomerControls = ({
  searchTerm,
  onSearchChange,
  newCustomerName,
  onNewCustomerNameChange,
  newCustomerPhone,
  onNewCustomerPhoneChange,
  newCustomerAddress,
  onNewCustomerAddressChange,
  onAddCustomer
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onAddCustomer();
    }
  };

  const handleAddCustomer = () => {
    if (newCustomerName.trim() && newCustomerPhone.trim()) {
      onAddCustomer();
    }
  };

  return (
    <div className="customer-controls-container">
      <h3>Add New Customer</h3>
      
      {/* Add Customer Form */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="customerName">Customer Name *</label>
          <input
            id="customerName"
            type="text"
            placeholder="Enter customer name"
            value={newCustomerName}
            onChange={(e) => onNewCustomerNameChange(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="customerPhone">Phone Number *</label>
          <input
            id="customerPhone"
            type="tel"
            placeholder="Enter phone number"
            value={newCustomerPhone}
            onChange={(e) => onNewCustomerPhoneChange(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="customerAddress">Address</label>
        <input
          id="customerAddress"
          type="text"
          placeholder="Enter customer address"
          value={newCustomerAddress}
          onChange={(e) => onNewCustomerAddressChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="form-actions">
        <button 
          className="btn btn-primary" 
          onClick={handleAddCustomer}
          disabled={!newCustomerName.trim() || !newCustomerPhone.trim()}
        >
          <span>➕</span>
          Add Customer
        </button>
      </div>

      {/* Search Section */}
      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for customers..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerControls;
