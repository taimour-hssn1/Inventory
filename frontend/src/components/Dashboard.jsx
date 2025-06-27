import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar"; // Renamed for clarity
import CustomerPage from "./CustomerPage";
import InventoryPage from "./InventoryPage";
import OrderPlacing from "./OrderPlacing";
import OrderRecords from "./OrderRecords";
import "../app.css";

const Dashboard = ({ setToken }) => {
  return (
    <div className="App">
      <Navbar setToken={setToken} />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<h1 className="page-title">Welcome to the Dashboard</h1>}
          />
          <Route path="customer" element={<CustomerPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="orders/place" element={<OrderPlacing />} />
          <Route path="orders/view" element={<OrderRecords />} />
          <Route
            path="*"
            element={
              <h1 className="page-title">404 - Page Not Found in Dashboard</h1>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
