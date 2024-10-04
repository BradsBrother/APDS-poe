import React, { useEffect, useState } from 'react';
import '../Styles/Dashboard.css'; // Import the stylesheet

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Simulated API call to fetch transaction data
        const fetchData = async () => {
            // Simulate fetching transactions
            setTransactions([
                { id: 1, date: '2024-09-01', amount: 'R500', status: 'Completed' },
                { id: 2, date: '2024-09-02', amount: 'R250', status: 'Pending' },
                { id: 3, date: '2024-09-03', amount: 'R1200', status: 'Completed' },
            ]);
        };

        fetchData();
    }, []);

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
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
