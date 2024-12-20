import React, { useState } from 'react';
import { validateAmount, validateCurrency } from '../Utils/Validations';
import '../Styles/Transaction.css';
import { getCsrfToken } from '../Services/csrfService';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAmount(amount) || !validateCurrency(currency)) {
      alert('Invalid input. Please check your entries.');
      
      return;
    }

    try {
      const csrfToken = await getCsrfToken()

      const response = await fetch("https://localhost:3030/api/Payment/Pay", {
        method: "POST",
        body: JSON.stringify({amount: amount, currency: currency}),
        headers: {
            "Content-Type": "application/json",
            'CSRF-Token': csrfToken,
        },
        credentials: "include", // Include cookies if needed
      });

      alert('Payment successful');
      console.log('Payment successful', response.data);
     
    } catch (error) {
      console.error("Payment error", error.response?.data?.error);
    }
  };

  return (
    <div className="transaction-container">
      <div className="transaction-box">
        <h1>Payment</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <div className="input-container"> 
            <div className="label-container"> 
              <h4><strong>SWIFT Code:</strong></h4> 
            </div> 
            <input type="text" className="readonly-input" placeholder="BBZAJJGQE" readOnly /> 
          </div>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="Dropdown-Box"
            required
          >
            <option value="">Select Currency</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
          <button type="submit">Submit Payment</button>
        </form>
      </div>
    </div>
  );
};
export default Payment;
