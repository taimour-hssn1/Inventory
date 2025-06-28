import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar"; // Renamed for clarity
import CustomerPage from "./CustomerPage";
import InventoryPage from "./InventoryPage";
import OrderPlacing from "./OrderPlacing";
import OrderRecords from "./OrderRecords";
import Installments from "./AddInstallments";
import "../app.css";

const Dashboard = ({ setToken }) => {
  return (
    <div className="App">
      <Navbar setToken={setToken} />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="dashboard-title-container">
                <h1 >Welcome to the Dashboard</h1>
              </div>
            }
          />
          <Route path="customer" element={<CustomerPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="orders/place" element={<OrderPlacing />} />
          <Route path="orders/view" element={<OrderRecords />} />
          <Route path="/installments" element={<Installments/>} />
          <Route
            path="*"
            element={
              <h1>404 - Page Not Found in Dashboard</h1>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
