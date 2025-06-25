import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import CustomerPage from './CustomerPage';
import InventoryPage from './InventoryPage';
import OrderManager from './OrderManager';
import '../app.css'; // Dashboard specific styles

const Dashboard = ({ setToken }) => {
  return (
    <div className="App">
      <Sidebar setToken={setToken} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<h1 className='page-title'>Welcome to the Dashboard</h1>} />
          <Route path="/" element={<h1 className='page-title'>Welcome Home!</h1>} />
          <Route path="customer" element={<CustomerPage />}/>
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="orders" element={<OrderManager />} />
          <Route path="*" element={<h1 className='page-title'>404 - Page Not Found in Dashboard</h1>} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
