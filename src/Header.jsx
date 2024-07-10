import React, { useState } from 'react';
import { BsJustify } from 'react-icons/bs';
import './Header.css';

function Header({ OpenSidebar, currentPage, onLogout, customerInfo }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    window.location.href = '/';
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const createNewCreditOrder = () => {
    // Handle creating new credit order functionality
    console.log('Creating new credit order');
  };

  if (!customerInfo) {
    return null; // Handle case where customerInfo is not yet available or undefined
  }

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        {/* Add any left header content here */}
      </div>
      <div className="header-right">
        <div className="profile-container">
          <button onClick={toggleProfileDropdown} className="btn-profile">
            Profile
          </button>
          {isProfileOpen && (
            <div className="profile-dropdown">
              <table className="customer-info-table">
                <tbody>
                  <tr>
                    <th>FIN</th>
                    <td>{customerInfo.FIN}</td>
                  </tr>
                  <tr>
                    <th>The actual address</th>
                    <td>{customerInfo["The actual address"]}</td>
                  </tr>
                  <tr>
                    <th>Series and code</th>
                    <td>{customerInfo["Series and code"]}</td>
                  </tr>
                  <tr>
                    <th>Name Surname Paternal name</th>
                    <td>{customerInfo["Name Surname Paternal name"]}</td>
                  </tr>
                  <tr>
                    <th>Registration address</th>
                    <td>{customerInfo["Registration address"]}</td>
                  </tr>
                  <tr>
                    <th>Date of Birth</th>
                    <td>{customerInfo["Date of Birth"]}</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={createNewCreditOrder}>
                Yeni kredit sifarişi yarat
              </button>
            </div>
          )}
        </div>
        <button onClick={handleLogout} className="btn1">
          LOG OUT
        </button>
      </div>
    </header>
  );
}

export default Header;
