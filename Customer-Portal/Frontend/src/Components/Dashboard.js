import React, { useEffect, useState } from 'react';
import '../Styles/Dashboard.css'; 
import TransactionDetails from './TransactionDetails';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const location = useLocation();
    const user = location.state?.user || {}; 

    console.log('Location State:', location.state); 
    console.log('User Data:', user); 

    useEffect(() => {
        const fetchTransactions = async () => {
            try{
            const response = await fetch("https://localhost:3030/api/Payment/Payments", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies if needed
            });
        
            // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Log the data in a readable format
        console.log(data);
        
        // If you want to format it further (for example, as a pretty-printed JSON string)
        console.log(JSON.stringify(data, null, 2)); // Indent with 2 spaces
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
        };
        fetchTransactions();
    }, [user]);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Welcome to Your Dashboard</h1>

            <div className="dashboard-section">
                <div className="section">
                    <div className="dashboard-card">
                        <h2>Account Overview</h2>
                        <p>Amount Spent: R5000</p>
                        <p>Last Payment: *</p>
                    </div>
                </div>

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
