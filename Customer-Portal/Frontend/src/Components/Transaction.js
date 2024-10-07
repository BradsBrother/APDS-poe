import React, { useState } from 'react';
import { makePayment } from '../Services/paymentService';
import { validateAmount, validateCurrency } from '../Utils/Validations';
import '../Styles/Transaction.css';

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
      const response = await fetch("https://localhost:3030/api/Payment/Pay", {
        method: "POST",
        body: JSON.stringify({amount: amount, currency: currency}),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies if needed
      });

      alert('Payment successful');
      console.log('Payment successful', response.data);
    } catch (error) {
      console.error('Payment error', error.response?.data?.error);
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
          <input
            type="text"
            placeholder="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          />
          <button type="submit">Submit Payment</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
