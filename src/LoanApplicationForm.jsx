import React, { useState, useEffect } from 'react';

function LoanApplicationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    currency: '',
    creditPurpose: '',
    amount: '',
    duration: '',
    interestRate: ''
  });

  const [loanDetails, setLoanDetails] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    amortizationSchedule: []
  });

  useEffect(() => {
    const savedLoanDetails = localStorage.getItem('LoanDetails');
    if (savedLoanDetails) {
      setLoanDetails(JSON.parse(savedLoanDetails));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateLoan = () => {
    const { amount, duration, interestRate } = formData;

    const principal = parseFloat(amount);
    const months = parseFloat(duration);
    const rate = parseFloat(interestRate) / 100 / 12;

    const monthlyPayment = (principal * rate) / (1 - Math.pow(1 + rate, -months));
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    let balance = principal;
    const amortizationSchedule = [];
    for (let i = 1; i <= months; i++) {
      const interest = balance * rate;
      const principalPayment = monthlyPayment - interest;
      balance -= principalPayment;

      amortizationSchedule.push({
        month: i,
        monthlyPayment: monthlyPayment.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        interestPayment: interest.toFixed(2),
        balance: balance.toFixed(2)
      });
    }

    const newLoanDetails = {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      amortizationSchedule: amortizationSchedule
    };

    setLoanDetails(newLoanDetails);
    localStorage.setItem('LoanDetails', JSON.stringify(newLoanDetails));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateLoan();
    onSubmit(formData, loanDetails);
  };

  return (
    <div>
      <form className="loan-application-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select id="currency" name="currency" value={formData.currency} onChange={handleChange}>
            <option value="">Select Currency</option>
            <option value="AZN">AZN</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="TRY">TRY</option>
            {/* Add other currencies as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="creditPurpose">Credit Purpose</label>
          <select id="creditPurpose" name="creditPurpose" value={formData.creditPurpose} onChange={handleChange}>
            <option value="">Select Credit Purpose</option>
            <option value="Consumer Loan">Consumer Loan</option>
            <option value="Auto Loan">Auto Loan</option>
            <option value="Business Loan">Business Loan</option>
            {/* Add other credit purposes as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (months)</label>
          <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="interestRate">Interest Rate (%)</label>
          <input type="number" id="interestRate" name="interestRate" value={formData.interestRate} onChange={handleChange} />
        </div>
        <button type="submit" className="calculate-button">Calculate</button>
      </form>

      {loanDetails.monthlyPayment && (
        <div className="loan-results">
          <h2>Loan Calculation Results</h2>
          <p>Monthly Payment: {loanDetails.monthlyPayment}</p>
          <p>Total Payment: {loanDetails.totalPayment}</p>
          <p>Total Interest: {loanDetails.totalInterest}</p>

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
              {loanDetails.amortizationSchedule.map((payment) => (
                <tr key={payment.month}>
                  <td>{payment.month}</td>
                  <td>{payment.monthlyPayment}</td>
                  <td>{payment.principalPayment}</td>
                  <td>{payment.interestPayment}</td>
                  <td>{payment.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LoanApplicationForm;
