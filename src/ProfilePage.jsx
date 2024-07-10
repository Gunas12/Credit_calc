import React, { useState } from 'react';
import './ProfilePage.css';

function ProfilePage({ customerInfo, onCreateCreditOrder, onLogout }) {
  const [formData, setFormData] = useState({
    sector: '',
    monthlyIncome: '',
    yearsExperience: '',
    monthsExperience: '',
    region: '',
    businessAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCreateCreditOrder = () => {
    const updatedCustomerData = {
      ...customerInfo,
      ...formData
    };
    onCreateCreditOrder(updatedCustomerData);

    // Save data to local storage
    localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
    localStorage.setItem('creditOrderData', JSON.stringify(formData));
  };

  // Check if customerInfo is null before rendering
  if (!customerInfo) {
    return (
      <div className="profile-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h2>Customer Profile</h2>
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
            <th>Telephone</th>
            <td>{customerInfo["Telephone"]}</td>
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

      <h2>Create New Credit Order</h2>
      <form className="credit-order-form">
        <div className="form-group">
          <label htmlFor="sector">Sector</label>
          <input type="text" id="sector" name="sector" value={formData.sector} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="monthlyIncome">Monthly Income</label>
          <input type="number" id="monthlyIncome" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="yearsExperience">Years of Experience</label>
          <input type="number" id="yearsExperience" name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="monthsExperience">Months of Experience</label>
          <input type="number" id="monthsExperience" name="monthsExperience" value={formData.monthsExperience} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="region">Region</label>
          <input type="text" id="region" name="region" value={formData.region} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="businessAddress">Business Address</label>
          <input type="text" id="businessAddress" name="businessAddress" value={formData.businessAddress} onChange={handleChange} />
        </div>
        <button type="button" className="add-button logout-button" onClick={handleCreateCreditOrder}>
          ADD
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
