import React from "react";
import "./CustomerList.css";

const CustomerList = ({ customers, onAddIndividual, onDeleteIndividual }) => {
  return (
    <div className="customer-list-container">
      {customers.length === 0 ? (
        <p>No customers to display.</p>
      ) : (
        <ul className="customer-list">
          {customers.map((customer) => (
            <li key={customer.id} className="customer-item">
              <div className="customer-details">
                <p>
                  <strong>ID:</strong> {customer.id}
                </p>
                <p>
                  <strong>Name:</strong> {customer.name}
                </p>
                <p>
                  <strong>Phone:</strong> {customer.phone}
                </p>
                <p>
                  <strong>Address:</strong> {customer.address}
                </p>
              </div>
              <div className="customer-actions">
                <button
                  className="action-button edit-button"
                  onClick={() => onEditIndividual(customer)}
                >
                  Edit
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
