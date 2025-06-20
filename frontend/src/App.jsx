import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CustomerPage from './components/CustomerPage'; // Import the new CustomerPage component
import InventoryPage from './components/InventoryPage';
import './App.css'; // Main app layout CSS

function App() {
  // State to keep track of the currently selected menu item
  const [selectedMenuItem, setSelectedMenuItem] = useState('Home'); // Default to 'Home'

  // Function to handle clicks on sidebar items
  const handleMenuItemClick = (itemName) => {
    setSelectedMenuItem(itemName);
  };

  // Conditional rendering of content based on selectedMenuItem
  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'Home':
        return (
          <div className="page-content">
            <h1>Welcome Home!</h1>
            <p>Select an option from the sidebar to navigate.</p>
          </div>
        );
      case 'Customer':
        return <CustomerPage />;
      // Add more cases for other menu items here if you expand your app
      case 'Inventory': // Add this case for Inventory
        return <InventoryPage />;
      case 'Orders':
        return (
          <div className="page-content">
            <h1>Order Management</h1>
            <p>Content for Orders goes here.</p>
          </div>
        );
      case 'Revenue':
          return (
            <div className="page-content">
              <h1>Revenue Dashboard</h1>
              <p>Content for Revenue goes here.</p>
            </div>
          );
      case 'Growth':
          return (
            <div className="page-content">
              <h1>Growth Analytics</h1>
              <p>Content for Growth goes here.</p>
            </div>
          );
      case 'Report':
          return (
            <div className="page-content">
              <h1>Reports Section</h1>
              <p>Content for Reports goes here.</p>
            </div>
          );
      case 'Settings':
          return (
            <div className="page-content">
              <h1>Application Settings</h1>
              <p>Content for Settings goes here.</p>
            </div>
          );
      default:
        return (
          <div className="page-content">
            <h1>Page Not Found</h1>
            <p>Please select a valid option from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <Sidebar activeItem={selectedMenuItem} onMenuItemClick={handleMenuItemClick} />
      <main className="main-content"> {/* Use a main tag for semantic HTML */}
        {renderContent()}
      </main>
    </div>
  );
}

export default App;