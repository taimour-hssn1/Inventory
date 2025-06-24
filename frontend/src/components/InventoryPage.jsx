import React, { useEffect, useState } from 'react';
import InventoryControls from './InventoryControls';
import InventoryList from './InventoryList';
import './InventoryPage.css';
import api from '../api'; // Axios instance with JWT setup

const InventoryPage = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newItemCode, setNewItemCode] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/api/items/');
      // Optionally add itemCode client-side for search clarity
      const items = res.data.map((item, index) => ({
        id: item.id,
        itemCode: `${item.id.toString().padStart(3, '0')}`,
        itemName: item.name,
        itemQuantity: item.quantity,
        itemPrice: parseFloat(item.price),
      }));
      setInventoryItems(items);
    } catch (err) {
      console.error('Failed to fetch inventory items:', err);
    }
  };

  const handleAddInventoryItem = async () => {
    if (
      newItemCode.trim() === '' ||
      newItemName.trim() === '' ||
      newItemQuantity === '' ||
      newItemPrice === ''
    ) {
      alert('All fields must be filled for a new inventory item!');
      return;
    }

    try {
      const newItem = {
        name: newItemName,
        quantity: parseInt(newItemQuantity),
        price: parseFloat(newItemPrice),
        quantity_per_container: 1 // You can expose this as input too
      };

      await api.post('/api/item/add/', newItem); // Assumes this POST endpoint exists
      fetchItems(); // Refresh list
      setNewItemCode('');
      setNewItemName('');
      setNewItemQuantity('');
      setNewItemPrice('');
    } catch (err) {
      console.error('Failed to add item:', err);
    }
  };

  const handleDeleteInventoryItem = (id) => {
    setInventoryItems(inventoryItems.filter((item) => item.id !== id));
    // Optional: you can also hit a DELETE API here
  };

  const filteredInventory = inventoryItems.filter((item) =>
    item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
