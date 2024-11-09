import React, { useEffect, useState } from 'react';
import '../Styles/Dashboard.css'; 
import TransactionDetails from './TransactionDetails';
import { getCsrfToken } from '../Services/csrfService';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const csrfToken = await getCsrfToken()
                const response = await fetch("https://localhost:3030/api/Payment/Payments", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'CSRF-Token': csrfToken,
                    },
                    credentials: "include", 
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Access the lstPayments array 
                if (data.lstPayments && Array.isArray(data.lstPayments)) {
                    setTransactions(data.lstPayments);

                   
                } else {
                    console.error('lstPayments is not an array:', data);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        
        fetchTransactions(); 
    }, []); 

    return (
        <div className="custom-dashboard-container">
  <div className="custom-dashboard-header">
    <h2>Recent Transactions</h2>
  </div>

  <div className="custom-dashboard-section">
    <div className="custom-section">
      <table className="custom-transaction-table">
        <thead>
          <tr>
          <th>Currency</th>
            <th>Amount</th>
            
            <th>Account Number</th>
          </tr>
        </thead>
        <tbody>
        {transactions.length > 0 ? (
                                transactions.map((pay, index) => (
                                    <TransactionDetails key={pay._id || index} pay={pay} />
                                ))
                            ) : (
            <tr>
              <td colSpan="3">No transactions available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>

    );
};

export default Dashboard;
