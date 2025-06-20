import React from 'react';
import './CustomerControls.css'; // New CSS file for this component

// Props:
// - searchTerm: string
// - onSearchChange: function (updates searchTerm)
// - newCustomerName: string
// - onNewCustomerNameChange: function (updates newCustomerName)
// - onAddCustomer: function (triggers adding a new customer)
const CustomerControls = ({
  searchTerm,
  onSearchChange,
  newCustomerName,
  onNewCustomerNameChange,
  onAddCustomer,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onAddCustomer();
    }
  };

  return (
    <div className="customer-controls-container">
      {/* This div contains the "New customer name" input and "Add Customer" button */}
      {/* This section will now be at the top */}
      <div className="add-customer-row">
        <input
          type="text"
          placeholder="New customer name"
          className="new-customer-input"
          value={newCustomerName}
          onChange={(e) => onNewCustomerNameChange(e.target.value)}
          onKeyPress={handleKeyPress} // Allows adding on Enter key press
        />
        <button className="add-customer-button" onClick={onAddCustomer}>
          Add Customer
        </button>
      </div>

      {/* The search input will now be at the bottom */}
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