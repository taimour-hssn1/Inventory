import "./AddInstallments.css";
import React, { useState, useEffect } from "react";
import api from "../api";

const Installments = () => {
  const [Orders, setOrders] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/api/orders/");
        setOrders(response.data);
      } catch (error) {
        alert("Error fetching Orders:", error);
      }
    };
    fetchOrders();
  }, []);



  const handleAddInstallment = async () => {
    if (!selectedPurchase || !amount) {
      alert("Please select a purchase and enter an amount.");
      return;
    }

    try {
      const response = await api.post(`/api/add-installment/${selectedPurchase}/`, {
        amount: parseFloat(amount),
      });
      alert("Installment added successfully!");
      setSelectedPurchase();
      setAmount("");
    } catch (error) {
      console.error("Error adding installment:", error);
      alert("Failed to add installment. Please try again.");
    }
  }

  return (
    <div className="add-installment-container">
      <h2>Add Installment</h2>
      <div>
        <label>Select Purchase:</label>
        <select
          value={selectedPurchase}
          onChange={(e) => setSelectedPurchase(e.target.value)}
        >
          <option value="">-- Select Purchase --</option>
         {Orders.filter(p => !p.is_paid).map((p) => (
            <option key={p.id} value={p.id}>
              #{p.id} - {p.customer_name} - PKR {p.total_amount} | 📅  Date : {new Date(p.purchase_date).toLocaleDateString('en-GB')}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button onClick={handleAddInstallment}>Add Installment</button>
    </div>
  );

};

export default Installments;
