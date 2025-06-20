import React, { useState } from 'react';
import InventoryControls from './InventoryControls';
import InventoryList from './InventoryList';
import './InventoryPage.css'; // New CSS for this page container

const InventoryPage = () => {
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, itemCode: 'A001', itemName: 'Laptop', itemQuantity: 15, itemPrice: 1200.00 },
    { id: 2, itemCode: 'B005', itemName: 'Mouse', itemQuantity: 50, itemPrice: 25.50 },
    { id: 3, itemCode: 'C010', itemName: 'Keyboard', itemQuantity: 30, itemPrice: 75.00 },
    { id: 4, itemCode: 'D015', itemName: 'Monitor', itemQuantity: 10, itemPrice: 300.00 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newItemCode, setNewItemCode] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(''); // Use string for input, convert to number on add
  const [newItemPrice, setNewItemPrice] = useState('');     // Use string for input, convert to number on add

  // Filter inventory items based on search term (item code or name)
  const filteredInventory = inventoryItems.filter((item) =>
    item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a new inventory item
  const handleAddInventoryItem = () => {
    if (newItemCode.trim() === '' || newItemName.trim() === '' || newItemQuantity === '' || newItemPrice === '') {
      alert('All fields must be filled for a new inventory item!');
      return;
    }
    if (isNaN(parseFloat(newItemQuantity)) || parseFloat(newItemQuantity) < 0) {
      alert('Quantity must be a non-negative number!');
      return;
    }
    if (isNaN(parseFloat(newItemPrice)) || parseFloat(newItemPrice) < 0) {
      alert('Price must be a non-negative number!');
      return;
    }

    const newId = inventoryItems.length > 0 ? Math.max(...inventoryItems.map(item => item.id)) + 1 : 1;
    const newInventoryItem = {
      id: newId,
      itemCode: newItemCode.trim().toUpperCase(),
      itemName: newItemName.trim(),
      itemQuantity: parseInt(newItemQuantity), // Convert to integer
      itemPrice: parseFloat(newItemPrice).toFixed(2), // Convert to float and fix decimals
    };

    setInventoryItems([...inventoryItems, newInventoryItem]);
    // Clear input fields
    setNewItemCode('');
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemPrice('');
  };

  // Handle deleting an inventory item
  const handleDeleteInventoryItem = (id) => {
    setInventoryItems(inventoryItems.filter((item) => item.id !== id));
  };

  return (
    <div className="inventory-page-container">
      <h2>Inventory Management</h2>
      <InventoryControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        newItemCode={newItemCode}
        onNewItemCodeChange={setNewItemCode}
        newItemName={newItemName}
        onNewItemNameChange={setNewItemName}
        newItemQuantity={newItemQuantity}
        onNewItemQuantityChange={setNewItemQuantity}
        newItemPrice={newItemPrice}
        onNewItemPriceChange={setNewItemPrice}
        onAddInventoryItem={handleAddInventoryItem}
      />
      <InventoryList
        inventory={filteredInventory}
        onDeleteInventoryItem={handleDeleteInventoryItem}
      />
    </div>
  );
};

export default InventoryPage;