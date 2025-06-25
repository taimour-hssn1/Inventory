import React from 'react';
import './CustomerControls.css'; // You can reuse the styling

const EditCustomerForm = ({
  name,
  phone,
  address,
  onNameChange,
  onPhoneChange,
  onAddressChange,
  onUpdateCustomer,
  onCancelEdit,
}) => {
  return (
    <div className="customer-controls-container">
      <div className="add-customer-row">
        <input
          type="text"
          placeholder="Customer name"
          className="new-customer-input"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone number"
          className="new-customer-input"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className="new-customer-input"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
        />
        <button className="add-customer-button" onClick={onUpdateCustomer}>
          Update Customer
        </button>
        <button className="cancel-edit-button" onClick={onCancelEdit}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCustomerForm;
