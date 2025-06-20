import React, { useState } from 'react';
import CustomerControls from './CustomerControls';
import CustomerList from './CustomerList';
import './CustomerPage.css'; // New CSS for this page container

const CustomerPage = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Alice Smith' },
    { id: 2, name: 'Bob Johnson' },
    { id: 3, name: 'Charlie Brown' },
    { id: 4, name: 'David Lee' },
    { id: 5, name: 'Eve Davis' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a new customer
  const handleAddCustomer = () => {
    if (newCustomerName.trim() === '') {
      alert('Customer name cannot be empty!');
      return;
    }
    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    setCustomers([...customers, { id: newId, name: newCustomerName.trim() }]);
    setNewCustomerName(''); // Clear input field
  };

  // Handle deleting a customer
  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  // Placeholder for individual "Add" action (customize as needed)
  const handleAddIndividual = (id) => {
    alert(`Add action for customer ID: ${id}. This typically means adding an order, note, etc., for THIS customer.`);
    // Example: You might open a modal here to add an order
  };

  return (
    <div className="customer-page-container">
      <h2>Customer Management</h2>
      <CustomerControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        newCustomerName={newCustomerName}
        onNewCustomerNameChange={setNewCustomerName}
        onAddCustomer={handleAddCustomer}
      />
      <CustomerList
        customers={filteredCustomers}
        onAddIndividual={handleAddIndividual}
        onDeleteIndividual={handleDeleteCustomer}
      />
    </div>
  );
};

export default CustomerPage;