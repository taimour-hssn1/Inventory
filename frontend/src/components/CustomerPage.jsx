import React, { useEffect, useState } from "react";
import CustomerControls from "./CustomerControls";
import CustomerList from "./CustomerList";
import "./CustomerPage.css";
import api from "../api"; // your Axios instance

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [newCustomerAddress, setNewCustomerAddress] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/api/customers/");
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = async () => {
    if (
      newCustomerName.trim() === "" ||
      newCustomerPhone.trim() === "" ||
      newCustomerAddress.trim() === ""
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      await api.post("/api/add-customer/", {
        name: newCustomerName,
        phone: newCustomerPhone,
        address: newCustomerAddress,
      });

      const refreshed = await api.get("/api/customers/");
      setCustomers(refreshed.data);

      // Reset fields
      setNewCustomerName("");
      setNewCustomerPhone("");
      setNewCustomerAddress("");
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

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
        newCustomerPhone={newCustomerPhone}
        onNewCustomerPhoneChange={setNewCustomerPhone}
        newCustomerAddress={newCustomerAddress}
        onNewCustomerAddressChange={setNewCustomerAddress}
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
