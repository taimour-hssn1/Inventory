import React from "react";
import "./InventoryControls.css";

const InventoryControls = ({
  searchTerm,
  onSearchChange,
  newItemCode,
  onNewItemCodeChange,
  newItemName,
  onNewItemNameChange,
  newItemQuantity,
  onNewItemQuantityChange,
  newItemPrice,
  onNewItemPriceChange,
  onAddInventoryItem,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onAddInventoryItem();
    }
  };

  return (
    <div className="inventory-controls-container">
      <div className="add-item-form">
        <input
          type="text"
          placeholder="Item Code"
          value={newItemCode}
          onChange={(e) => onNewItemCodeChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => onNewItemNameChange(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItemQuantity}
          onChange={(e) => onNewItemQuantityChange(e.target.value)}
          min="0"
        />
        <input
          type="number"
          placeholder="Price"
          value={newItemPrice}
          onChange={(e) => onNewItemPriceChange(e.target.value)}
          min="0"
          step="1" // Allows decimal values for price
          onKeyPress={handleKeyPress} // Allows adding on Enter key press
        />
        <button className="add-inventory-button" onClick={onAddInventoryItem}>
          Add Inventory Item
        </button>
      </div>
      <br></br>
      <input
        type="text"
        placeholder="Search by code or name..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default InventoryControls;
