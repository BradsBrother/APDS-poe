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
            if (user?.acc_no) {
                console.log(`Fetching transactions for account number: ${user.acc_no}`); 
                const response = await fetch(`/api/Payment/getUserPayments?acc_no=${user.acc_no}`);
                
                console.log('Fetch Response Status:', response.status);
                
                const json = await response.json();
                console.log('Response:', json); 
                
                if (response.ok) {
                    setTransactions(json);
                } else {
                    console.log('Error fetching transactions:', json);
                }
            } else {
                console.log('User account number is missing.'); 
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
