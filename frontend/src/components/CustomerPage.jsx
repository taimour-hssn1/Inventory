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

  const handleDeleteCustomer = async (id) => {
    console.log("Deleting customer with ID:", id); // Debug line

    try {
      await api.delete(`/api/delete-customer/${id}/`);
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer.");
    }
  };

  const handleAddIndividual = (id) => {
    alert(`Action for customer ID: ${id}`);
  };

  const handleEditIndividual = async (customer) => {
    const name = window.prompt("Enter new name:", customer.name);
    if (name === null) return;

    const phone = window.prompt("Enter new phone:", customer.phone);
    if (phone === null) return;

    const address = window.prompt("Enter new address:", customer.address);
    if (address === null) return;

    const updatedCustomer = { ...customer, name, phone, address };

    try {
      const res = await api.put(
        `/api/edit-customer/${customer.id}/`,
        updatedCustomer
      );

      const refreshed = await api.get("/api/customers/");
      setCustomers(refreshed.data);
    } catch (err) {
      console.error("Error updating customer:", err);
    }
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
        onEditIndividual={handleEditIndividual}
      />
    </div>
  );
};

export default CustomerPage;
