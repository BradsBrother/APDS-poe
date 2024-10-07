import React, { useEffect, useState } from 'react';
import '../Styles/Dashboard.css'; // Import the stylesheet

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await fetch('api/Payment/')
            const json = await response.json()

            if(response.ok){
                setTransactions(json)
            }
        }
        fetchTransactions()
    }, [])

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Welcome to Your Dashboard</h1>

            <div className="dashboard-section">
                <div className="section">
                    <div className="dashboard-card">
                        <h2>Account Overview</h2>
                        <p>Balance: R5,000</p>
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
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
