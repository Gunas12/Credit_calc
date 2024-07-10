import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import data from './data/data.json';

function Login({ onLogin }) {
  const [FIN, setFIN] = useState('');
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleFINChange = (e) => {
    setFIN(e.target.value);
  };

  const handleCheck = () => {
    const foundData = data.find(item => item.FIN === FIN);
    if (foundData) {
      setFormData(foundData);
      setError('');
    } else {
      setFormData({});
      setError('No data found for this FIN code');
    }
  };

  const handleLogin = () => {
    if (Object.keys(formData).length === 0) {
      setError('User not found. Please check the FIN code.');
    } else {
      onLogin(FIN);
      
      navigate('/profile');
    }
  };

  return (
    <div className="login-container">
      <div className='lg'>
        <h2 className="login-title">Login</h2>
        <div className='dic'>
        <input
          type="text"
          placeholder="FIN example:(7FR7NE4)"
          value={FIN}
          onChange={handleFINChange}
          className="login-input"
        />
        
        
        <button onClick={handleCheck} className="check-button">

          Check
        </button>
        </div>
        {Object.keys(formData).length > 0 && (
          <div className="named">
            <input
              type="text"
              placeholder="The actual address"
              value={formData["The actual address"] || ''}
              onChange={(e) => {}}
              className="login-input"
            />
            <input
              type="text"
              placeholder="Series and code"
              value={formData["Series and code"] || ''}
              onChange={(e) => {}}
              className="login-input"
            />
            <input
              type="text"
              placeholder="Name Surname Paternal name"
              value={formData["Name Surname Paternal name"] || ''}
              onChange={(e) => {}}
              className="login-input"
            />
            <input
              type="text"
              placeholder="Registration address"
              value={formData["Registration address"] || ''}
              onChange={(e) => {}}
              className="login-input"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={formData["Date of Birth"] || ''}
              onChange={(e) => {}}
              className="login-input"
            />
             <button onClick={handleLogin} className="login-button">
          Login
        </button>
          </div>
        )}
       
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
