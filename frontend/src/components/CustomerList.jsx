import React from 'react';
import './CustomerList.css';

const CustomerList = ({ customers, onAddIndividual, onDeleteIndividual }) => {
  return (
    <div className="customer-list-container">
      {customers.length === 0 ? (
        <p>No customers to display.</p>
      ) : (
        <ul className="customer-list">
          {customers.map((customer) => (
            <li key={customer.id} className="customer-item">
              <span className="customer-name">{customer.name}</span>
              <div className="customer-actions">
                <button
                  className="action-button add-button"
                  onClick={() => onAddIndividual(customer.id)}
                >
                  Add
                </button>
                <button
                  className="action-button delete-button"
                  onClick={() => onDeleteIndividual(customer.id)}
                >
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