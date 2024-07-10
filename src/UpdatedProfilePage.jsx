import React, { useState, useEffect } from 'react';
import './UpdatedProfilePage.css';
import { useNavigate } from 'react-router-dom';
import LoanApplicationForm from './LoanApplicationForm';

function UpdatedProfilePage({ customerInfo, onLogout }) {
  const [guarantors, setGuarantors] = useState([]);
  const [guarantorFormData, setGuarantorFormData] = useState({
    guarantorName: '',
    guarantorPhoneNumber: ''
  });
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const storedGuarantors = JSON.parse(localStorage.getItem('guarantors'));
    if (storedGuarantors) {
      setGuarantors(storedGuarantors);
    }
  }, []);

  const handleCreditApplication = () => {
    alert('Proceeding with credit application...');
  };

  const handleSubmitLoanForm = (formData) => {
    console.log('Loan Form Data:', formData);
    const creditOrderData = {
      customerInfo,
      loanFormData: formData,
      guarantors
    };
    localStorage.setItem('CreditOrderReport', JSON.stringify(creditOrderData));
    setReportData(creditOrderData);
  };

  const handleAddGuarantor = () => {
    const newGuarantor = {
      name: guarantorFormData.guarantorName,
      phoneNumber: guarantorFormData.guarantorPhoneNumber
    };
    const updatedGuarantors = [...guarantors, newGuarantor];
    setGuarantors(updatedGuarantors);
    console.log('New Guarantor Added:', newGuarantor);
    setGuarantorFormData({
      guarantorName: '',
      guarantorPhoneNumber: ''
    });
    localStorage.setItem('guarantors', JSON.stringify(updatedGuarantors));
  };

  const handleChangeGuarantorForm = (e) => {
    const { name, value } = e.target;
    setGuarantorFormData({
      ...guarantorFormData,
      [name]: value
    });
  };

  const handleConfirmLoan = () => {
    setIsConfirmed(true);
  };

  const handleRejectLoan = () => {
    const reason = prompt('Please enter the reason for rejection:');
    if (reason) {
      setRejectReason(reason);
      alert('Loan application rejected');
    }
  };

  const handleViewReport = () => {
    navigate('/report');
  };

  return (
    <div className="updated-profile-page">
      <h2>Updated Customer Profile</h2>
      <table className="customer-info-table">
        {/* Display customer information */}
      </table>
      <LoanApplicationForm onSubmit={handleSubmitLoanForm} />
      <div className="guarantor-section">
        <h3>Add New Guarantor</h3>
        <div className="form-group">
          <label htmlFor="guarantorName">Name Surname Paternal name</label>
          <input type="text" id="guarantorName" name="guarantorName" value={guarantorFormData.guarantorName} onChange={handleChangeGuarantorForm} />
        </div>
        <div className="form-group">
          <label htmlFor="guarantorPhoneNumber">Telephone number</label>
          <input type="text" id="guarantorPhoneNumber" name="guarantorPhoneNumber" value={guarantorFormData.guarantorPhoneNumber} onChange={handleChangeGuarantorForm} />
        </div>
        <button className="add-guarantor-button" onClick={handleAddGuarantor}>
          Add Guarantor
        </button>
      </div>
      {!isConfirmed && (
        <div className="confirmation-buttons">
          <button className="confirm-button credit-button" onClick={handleConfirmLoan}>
            Confirm Loan Application
          </button>
          <button className="reject-button credit-button" onClick={handleRejectLoan}>
            Reject Loan Application
          </button>
        </div>
      )}
      {isConfirmed && (
        <div className="confirmation-message">
          <p>Loan application confirmed!</p>
          <button className="view-report-button credit-button" onClick={handleViewReport}>
            View Report
          </button>
        </div>
      )}
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
      {rejectReason && (
        <div className="reject-reason">
          <p>Loan application rejected. Reason: {rejectReason}</p>
        </div>
      )}
    </div>
  );
}

export default UpdatedProfilePage;
