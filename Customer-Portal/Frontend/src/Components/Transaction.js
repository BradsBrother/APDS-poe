import React, { useState } from "react";
import { makePayment } from "../Services/paymentService";
import {
  validateAccNo,
  validateAmount,
  validateCurrency,
} from "../Utils/Validations";
import "../Styles/Transaction.css";

const Payment = () => {
  const [acc_no, setAccNo] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !validateAccNo(acc_no) ||
      !validateAmount(amount) ||
      !validateCurrency(currency)
    ) {
      alert("Invalid input. Please check your entries.");
      return;
    }

    try {
      const response = await makePayment({ acc_no, amount, currency });
      alert("Payment successful");
      console.log("Payment successful", response.data);
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
            type="text"
            placeholder="Account Number"
            value={acc_no}
            onChange={(e) => setAccNo(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
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
