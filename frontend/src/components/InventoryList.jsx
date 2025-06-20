import React from 'react';
import './InventoryList.css';

const InventoryList = ({ inventory, onDeleteInventoryItem }) => {
  return (
    <div className="inventory-list-container">
      {inventory.length === 0 ? (
        <p>No inventory items to display.</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.itemCode}</td>
                <td>{item.itemName}</td>
                <td>{item.itemQuantity}</td>
                <td>${item.itemPrice}</td>
                <td>
                  <button
                    className="delete-item-button"
                    onClick={() => onDeleteInventoryItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryList;