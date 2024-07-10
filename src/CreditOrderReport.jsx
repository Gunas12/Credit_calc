import React, { useEffect, useState } from 'react';
import './CreditOrderReport.css';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const CreditOrderReport = () => {
  const [customerInfo, setCustomerInfo] = useState(null);
  const [creditOrderData, setCreditOrderData] = useState(null);
  const [loanDetails, setLoanDetails] = useState(null);
  const [guarantors, setGuarantors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch each piece of data separately from localStorage
    const storedCustomerInfo = JSON.parse(localStorage.getItem('customerInfo'));
    const storedCreditOrderData = JSON.parse(localStorage.getItem('creditOrderData'));
    const storedLoanDetails = JSON.parse(localStorage.getItem('LoanDetails'));
    const storedGuarantors = JSON.parse(localStorage.getItem('guarantors'));

    // Set state variables if data exists in localStorage
    if (storedCustomerInfo) {
      setCustomerInfo(storedCustomerInfo);
    }
    if (storedCreditOrderData) {
      setCreditOrderData(storedCreditOrderData);
    }
    if (storedLoanDetails) {
      setLoanDetails(storedLoanDetails);
    }
    if (storedGuarantors) {
      setGuarantors(storedGuarantors);
    }
  }, []);

  if (!customerInfo || !creditOrderData || !loanDetails || !guarantors) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  // Function to export as PDF
  const exportAsPDF = () => {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    // Positioning variables
    let yPos = 20;
    const margin = 10;

    // Add title
    doc.setFontSize(18);
    doc.text('Credit Order Report', margin, yPos);
    yPos += 10;

    // Customer Information Table
    doc.setFontSize(12);
    doc.text('Customer Information', margin, yPos);
    yPos += 10;
    Object.entries(customerInfo).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, margin, yPos);
      yPos += 10;
    });
    yPos += 10;

    // Credit Order Data Table
    doc.text('Credit Order Data', margin, yPos);
    yPos += 10;
    Object.entries(creditOrderData).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, margin, yPos);
      yPos += 10;
    });
    yPos += 10;

    // Guarantors Table
    doc.text('Guarantors', margin, yPos);
    yPos += 10;
    guarantors.forEach((guarantor, index) => {
      doc.text(`Guarantor ${index + 1}:`, margin, yPos);
      doc.text(`Name: ${guarantor.name}`, margin + 25, yPos);
      doc.text(`Phone Number: ${guarantor.phoneNumber}`, margin + 90, yPos);
      yPos += 10;
    });
    yPos += 10;

    // Loan Details Table
    doc.text('Loan Details', margin, yPos);
    yPos += 10;
    doc.text(`Monthly Payment: ${loanDetails.monthlyPayment}`, margin, yPos);
    yPos += 10;
    doc.text(`Total Payment: ${loanDetails.totalPayment}`, margin, yPos);
    yPos += 10;
    doc.text(`Total Interest: ${loanDetails.totalInterest}`, margin, yPos);
    yPos += 10;

    // Save PDF
    doc.save('credit_order_report.pdf');
  };

  const handleLogout = () => {
    
    navigate('/');
    window.location.reload();
    localStorage.removeItem('creditOrderData');
    localStorage.removeItem('LoanDetails');
    localStorage.removeItem('guarantors');
    localStorage.removeItem('customerInfo');
    
  };

  return (
    <div className="credit-order-report">
      <h2>Credit Order Report</h2>

      {/* Tables for customer info, credit order data, loan details, and guarantors */}
      <table className="report-table">
        <thead>
          <tr>
            <th>Customer Information</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(customerInfo).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="report-table">
        <thead>
          <tr>
            <th>Credit Order Data</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(creditOrderData).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="report-table">
        <thead>
          <tr>
            <th>Guarantors</th>
            <th>Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {guarantors.map((guarantor, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{guarantor.name}</td>
              <td>{guarantor.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="report-table">
        <thead>
          <tr>
            <th>Loan Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monthly Payment</td>
            <td>{loanDetails.monthlyPayment}</td>
          </tr>
          <tr>
            <td>Total Payment</td>
            <td>{loanDetails.totalPayment}</td>
          </tr>
          <tr>
            <td>Total Interest</td>
            <td>{loanDetails.totalInterest}</td>
          </tr>
          <tr>
            <td>Amortization Schedule</td>
            <td>
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Monthly Payment</th>
                    <th>Principal Payment</th>
                    <th>Interest Payment</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {loanDetails.amortizationSchedule.map((schedule, index) => (
                    <tr key={index}>
                      <td>{schedule.month}</td>
                      <td>{schedule.monthlyPayment}</td>
                      <td>{schedule.principalPayment}</td>
                      <td>{schedule.interestPayment}</td>
                      <td>{schedule.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Export as PDF button */}
      <button className="export-button logout-button" onClick={exportAsPDF}>Export as PDF</button>

      {/* Logout button */}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default CreditOrderReport;
