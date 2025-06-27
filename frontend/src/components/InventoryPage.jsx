import React, { useEffect, useState } from "react";
import InventoryControls from "./InventoryControls";
import InventoryList from "./InventoryList";
import "./InventoryPage.css";
import api from "../api"; // Axios instance with JWT setup

const InventoryPage = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemQtyPerContainer, setNewItemQtyPerContainer] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get("/api/items/");
      const items = res.data.map((item) => ({
        id: item.id,
        itemName: item.name,
        itemQuantity: item.quantity,
        itemPrice: parseFloat(item.price),
        itemQtyPerContainer: item.quantity_per_container,
      }));
      setInventoryItems(items);
    } catch (err) {
      console.error("Failed to fetch inventory items:", err);
    }
  };

  const handleAddInventoryItem = async () => {
    if (
      newItemName.trim() === "" ||
      newItemQuantity === "" ||
      newItemPrice === "" ||
      newItemQtyPerContainer === ""
    ) {
      alert("All fields must be filled for a new inventory item!");
      return;
    }

    try {
      const newItem = {
        name: newItemName,
        quantity: parseInt(newItemQuantity),
        price: parseFloat(newItemPrice),
        quantity_per_container: parseInt(newItemQtyPerContainer),
      };

      await api.post("/api/add-item/", newItem);
      fetchItems(); // Refresh list
      setNewItemName("");
      setNewItemQuantity("");
      setNewItemPrice("");
      setNewItemQtyPerContainer("");
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  const handleDeleteInventoryItem = async(id) => {
    console.log("Deleting item with ID:", id); // Debug line
    try{
      await api.delete(`/api/delete-item/${id}/`);
      setInventoryItems(inventoryItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  const filteredInventory = inventoryItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditInventoryItem = async (item) => {
    const newName = window.prompt("Enter new name:", item.itemName);
    if (newName === null || newName.trim() === "") return;

    const newQuantity = window.prompt("Enter new quantity:", item.itemQuantity);
    if (newQuantity === null || isNaN(newQuantity)) return;

    const newPrice = window.prompt("Enter new price:", item.itemPrice);
    if (newPrice === null || isNaN(newPrice)) return;

    const newQtyPerContainer = window.prompt(
      "Enter quantity per container:",
      item.itemQtyPerContainer
    );
    if (newQtyPerContainer === null || isNaN(newQtyPerContainer)) return;

    const updatedItem = {
      name: newName.trim(),
      quantity: parseInt(newQuantity),
      price: parseFloat(newPrice),
      quantity_per_container: parseInt(newQtyPerContainer),
    };

    try {
      await api.put(`/api/edit-item/${item.id}/`, updatedItem);
      fetchItems(); // Refresh the list
    } catch (err) {
      console.error("Failed to update item:", err);
      alert("Failed to update item.");
    }
  };

  return (
    <div className="inventory-page-container">
      <h2>Inventory Management</h2>
      <InventoryControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        newItemName={newItemName}
        onNewItemNameChange={setNewItemName}
        newItemQuantity={newItemQuantity}
        onNewItemQuantityChange={setNewItemQuantity}
        newItemPrice={newItemPrice}
        onNewItemPriceChange={setNewItemPrice}
        newItemQtyPerContainer={newItemQtyPerContainer}
        onNewItemQtyPerContainerChange={setNewItemQtyPerContainer}
        onAddInventoryItem={handleAddInventoryItem}
      />
      <InventoryList
        inventory={filteredInventory}
        onDeleteInventoryItem={handleDeleteInventoryItem}
        onEditInventoryItem={handleEditInventoryItem}
      />
    </div>
  );
};

export default InventoryPage;
