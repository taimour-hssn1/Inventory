import React from 'react';
import './InventoryList.css';

const InventoryList = ({ inventory, onDeleteInventoryItem, onEditInventoryItem }) => {
  return (
    <div className="inventory-list-container">
      {inventory.length === 0 ? (
        <p>No inventory items to display.</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Qty / Container</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.itemName}</td>
                <td>{item.itemQuantity}</td>
                <td>${item.itemPrice.toFixed(2)}</td>
                <td>{item.itemQtyPerContainer}</td>
                <td>
                  <button
                    className="edit-item-button"
                    onClick={() => onEditInventoryItem(item)}
                  >
                    Edit
                  </button>
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
