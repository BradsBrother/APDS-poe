import React, { useEffect, useState } from 'react';
import '../Styles/Dashboard.css'; 
import TransactionDetails from './TransactionDetails';


const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch("https://localhost:3030/api/Payment/Payments", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Include cookies if needed
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                // Log the response to understand its structure
                console.log(data);

                // Access the lstPayments array from the response object
                if (data.lstPayments && Array.isArray(data.lstPayments)) {
                    setTransactions(data.lstPayments);

                   
                } else {
                    console.error('lstPayments is not an array:', data);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        
        fetchTransactions(); // Fetch only once on mount
    }, []); // Empty dependency array ensures it only runs once

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Welcome to Your Dashboard</h1>

            <div className="dashboard-section">
                

                <div className="section">
                    <div className="dashboard-card">
                        <h2>Recent Transactions</h2>
                        <table className="transaction-table">
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Currency</th>
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
        </div>
    );
};

export default Dashboard;
