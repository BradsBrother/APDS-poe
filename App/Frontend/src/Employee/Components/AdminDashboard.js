import React, { useEffect, useState } from 'react';
import bf from '../../moodeng.png';
import ModalComponent from "./VerifyBox"; // Your existing modal component
import '../Styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for your main modal visibility
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false); // State for verification modal
    const [selectedTransaction, setSelectedTransaction] = useState(null); // Selected transaction for verification
    const [swiftCode, setSwiftCode] = useState(''); // State for SWIFT code input

    useEffect(() => {
        const fetchUnverifiedTransactions = async () => {
            try {
                const response = await fetch("https://localhost:3030/api/Payment/UnverifiedPayments", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });
                

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching unverified transactions:", error);
            }
        };

        fetchUnverifiedTransactions();
    }, []);

    const handleVerifyTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setIsVerifyModalOpen(true);
    };

    const handleVerifyModalConfirm = () => {
        // Simple SWIFT code validation (customize as needed)
        if (swiftCode.length >= 8 && swiftCode.length <= 11) {
            setIsVerifyModalOpen(false);
            setIsModalOpen(true); // Open main modal after verification
        } else {
            alert("Invalid SWIFT code. Please enter a valid code.");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-section">
                <div className="section">
                    <div className="dashboard-card">
                        {transactions.length === 0 ? (
                            <p>No unverified transactions found.</p>
                        ) : (
                            <table className="transaction-table">
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>Currency</th>
                                        <th>Account Number</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map(transaction => (
                                        <tr key={transaction._id}>
                                            <td>{transaction.amount}</td>
                                            <td>{transaction.currency}</td>
                                            <td>{transaction.acc_no}</td>
                                            <td>
                                                <button onClick={() => handleVerifyTransaction(transaction)}>
                                                    Verify
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Verification Modal */}
            {isVerifyModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Enter SWIFT Code for Verification</h2>
                        <input
                            type="text"
                            value={swiftCode}
                            onChange={(e) => setSwiftCode(e.target.value)}
                            placeholder="Enter SWIFT code"
                        />
                        <button onClick={handleVerifyModalConfirm}>Confirm</button>
                        <button onClick={() => setIsVerifyModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Your existing modal */}
            {isModalOpen && selectedTransaction && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ModalComponent
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                        bf={bf}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
