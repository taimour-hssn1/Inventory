import React from "react";
import "./InventoryControls.css";

const InventoryControls = ({
  searchTerm,
  onSearchChange,
  newItemName,
  onNewItemNameChange,
  newItemPrice,
  onNewItemPriceChange,
  newItemQuantity,
  onNewItemQuantityChange,
  newItemQtyPerContainer,
  onNewItemQtyPerContainerChange,
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
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => onNewItemNameChange(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItemPrice}
          onChange={(e) => onNewItemPriceChange(e.target.value)}
          min="0"
          step="0.01"
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
          placeholder="Quantity per Container"
          value={newItemQtyPerContainer}
          onChange={(e) => onNewItemQtyPerContainerChange(e.target.value)}
          min="1"
          onKeyPress={handleKeyPress}
        />
        <button className="add-inventory-button" onClick={onAddInventoryItem}>
          Add Inventory Item
        </button>
      </div>
      <br />
      <input
        type="text"
        placeholder="Search by name..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default InventoryControls;
