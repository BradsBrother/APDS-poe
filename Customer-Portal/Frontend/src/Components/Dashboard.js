import React, { useEffect, useState } from 'react';
import '../Styles/Dashboard.css'; // Import the stylesheet
import TransactionDetails from './TransactionDetails';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const location = useLocation();
    const user = location.state?.user || {}; // Fallback to an empty object

    console.log('Location State:', location.state); // Debugging line
    console.log('User Data:', user); // Debugging line

    useEffect(() => {
        const fetchTransactions = async () => {
            if (user?.acc_no) {
                console.log(`Fetching transactions for account number: ${user.acc_no}`); // Debugging line
                const response = await fetch(`/api/Payment/getUserPayments?acc_no=${user.acc_no}`);
                
                console.log('Fetch Response Status:', response.status); // Debugging line
                
                const json = await response.json();
                console.log('Response:', json); // Debugging line
                
                if (response.ok) {
                    setTransactions(json);
                } else {
                    console.log('Error fetching transactions:', json);
                }
            } else {
                console.log('User account number is missing.'); // Debugging line
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
                        <p>Balance: R5,000,000,000,000,000,000</p>
                        <p>Last Payment: R250 on 2024-09-02</p>
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
