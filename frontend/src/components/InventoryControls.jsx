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

  const handleAddInventoryItem = () => {
    if (newItemName.trim() && newItemPrice > 0 && newItemQuantity >= 0) {
      onAddInventoryItem();
    }
  };

  return (
    <div className="inventory-controls-container">
      <h3>Add New Inventory Item</h3>
      
      {/* Add Inventory Form */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="itemName">Item Name *</label>
          <input
            id="itemName"
            type="text"
            placeholder="Enter item name"
            value={newItemName}
            onChange={(e) => onNewItemNameChange(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="itemPrice">Price *</label>
          <input
            id="itemPrice"
            type="number"
            placeholder="Enter price"
            value={newItemPrice}
            onChange={(e) => onNewItemPriceChange(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="itemQuantity">Quantity *</label>
          <input
            id="itemQuantity"
            type="number"
            placeholder="Enter quantity"
            value={newItemQuantity}
            onChange={(e) => onNewItemQuantityChange(e.target.value)}
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="itemQtyPerContainer">Quantity per Container</label>
          <input
            id="itemQtyPerContainer"
            type="number"
            placeholder="Enter quantity per container"
            value={newItemQtyPerContainer}
            onChange={(e) => onNewItemQtyPerContainerChange(e.target.value)}
            min="1"
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>

      <div className="form-actions">
        <button 
          className="btn btn-success" 
          onClick={handleAddInventoryItem}
          disabled={!newItemName.trim() || newItemPrice <= 0 || newItemQuantity < 0}
        >
          <span>📦</span>
          Add Inventory Item
        </button>
      </div>

      {/* Search Section */}
      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search inventory items..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryControls;
