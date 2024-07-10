import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import ProfilePage from './ProfilePage';
import UpdatedProfilePage from './UpdatedProfilePage';
import data from './data/data.json';
import CreditOrderReport from './CreditOrderReport';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (finCode) => {
    const foundCustomer = data.find(item => item.FIN === finCode);
    if (foundCustomer) {
      setCustomerInfo(foundCustomer);
      setIsLoggedIn(true);
    } else {
      console.log('Customer not found');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCustomerInfo(null);
    navigate('/'); // Navigate back to login page on logout
    localStorage.removeItem('creditOrderData');
    localStorage.removeItem('LoanDetails');
    localStorage.removeItem('guarantors');
    localStorage.removeItem('customerInfo');
    localStorage.removeItem('CreditOrderReport');
  };

  const handleCreateCreditOrder = (creditOrderData) => {
    console.log('Credit Order Data:', creditOrderData);
    setCustomerInfo(creditOrderData);
    navigate('/updated-profile'); // Navigate to updated profile page after creating credit order
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLoggedIn ? (
          <ProfilePageWrapper customerInfo={customerInfo} onCreateCreditOrder={handleCreateCreditOrder} />
        ) : (
          <Login onLogin={handleLogin} />
        )} />
        <Route path="/profile" element={<ProfilePage customerInfo={customerInfo} onCreateCreditOrder={handleCreateCreditOrder} onLogout={handleLogout} />} />
        <Route path="/updated-profile" element={<UpdatedProfilePage customerInfo={customerInfo} onLogout={handleLogout} />} />
        <Route path="/report" element={<CreditOrderReport />} />
      </Routes>
    </div>
  );
}

function ProfilePageWrapper({ customerInfo, onCreateCreditOrder }) {
  const navigate = useNavigate();

  const handleCreateCreditOrderWrapper = (creditOrderData) => {
    onCreateCreditOrder(creditOrderData);
    navigate('/updated-profile'); // Navigate to updated profile page after creating credit order
  };

  return (
    <ProfilePage customerInfo={customerInfo} onCreateCreditOrder={handleCreateCreditOrderWrapper} />
  );
}

export default App;
