import React from "react";
import "./CustomerList.css";

const CustomerList = ({ customers, onAddIndividual, onDeleteIndividual, onEditIndividual }) => {
  const handleDelete = (customerId, customerName) => {
    if (window.confirm(`Are you sure you want to delete customer "${customerName}"?`)) {
      onDeleteIndividual(customerId);
    }
  };

  return (
    <div className="customer-list-container">
      {customers.length === 0 ? (
        <div className="empty-state">
          <p>No customers to display.</p>
        </div>
      ) : (
        <ul className="customer-list">
          {customers.map((customer) => (
            <li key={customer.id} className="customer-item">
              <div className="customer-details">
                <div className="customer-info">
                  <h4 className="customer-id">{customer.name}</h4>
                  <div className="customer-meta">
                    <span className="customer-id">ID: {customer.id}</span>
                    <span className="customer-id">📞 {customer.phone}</span>
                    {customer.address && (
                      <span className="customer-id">📍 {customer.address}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="customer-actions">
                <button
                  className="action-button edit-button"
                  onClick={() => onEditIndividual(customer)}
                  title="Edit customer"
                >
                  <span>✏️</span>
                  Edit
                </button>

                <button
                  className="action-button delete-button"
                  onClick={() => handleDelete(customer.id, customer.name)}
                  title="Delete customer"
                >
                  <span>🗑️</span>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerList;
