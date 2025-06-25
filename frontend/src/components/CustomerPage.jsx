import React, { useEffect, useState } from 'react';
import CustomerControls from './CustomerControls';
import CustomerList from './CustomerList';
import './CustomerPage.css';
import api from '../api'; // your Axios instance

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');

  // ✅ Load customers from backend on mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/api/customers/');
        setCustomers(response.data);
        console.log('Customers loaded:', response.data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  // 🔍 Filter logic
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ➕ Add a new customer
  const handleAddCustomer = async () => {
    if (newCustomerName.trim() === '') {
      alert('Customer name cannot be empty!');
      return;
    }

    try {
      await api.post('/api/customer/add/', {
        name: newCustomerName,
        phone: '0000000000',
        address: 'N/A',
      });

      // Reload after adding
      const refreshed = await api.get('/api/customers/');
      setCustomers(refreshed.data);
      setNewCustomerName('');
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  // ❌ Delete customer (local only for now)
  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const handleAddIndividual = (id) => {
    alert(`Action for customer ID: ${id}`);
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
