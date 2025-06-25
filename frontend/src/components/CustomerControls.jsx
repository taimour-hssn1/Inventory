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
  onAddCustomer // for adding new customer
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onAddCustomer();
    }
  };

  return (
    <div className="customer-controls-container">
      {/* Add Customer Fields */}
      <div className="add-customer-row">
        <input
          type="text"
          placeholder="Customer name"
          className="new-customer-input"
          value={newCustomerName}
          onChange={(e) => onNewCustomerNameChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          className="new-customer-input"
          value={newCustomerPhone}
          onChange={(e) => onNewCustomerPhoneChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className="new-customer-input"
          value={newCustomerAddress}
          onChange={(e) => onNewCustomerAddressChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="add-customer-button" onClick={onAddCustomer}>
          Add Customer
        </button>
      </div>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search for customer..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default CustomerControls;
