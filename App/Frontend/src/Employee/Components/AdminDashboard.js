import React, { useEffect, useState } from 'react';
import bf from '../../moodeng.png';
import ModalComponent from "./VerifyBox";
import '../Styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransactions, setSelectedTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

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

    const handleVerify = (transactionId) => {
        setSelectedTransactions((prev) => [...prev, transactionId]);
    };

    const handleSubmitToSwift = async () => {
        try {
            const response = await fetch("https://localhost:3030/api/Payment/VerifySubmit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ transactionIds: selectedTransactions }),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert("Transactions submitted successfully.");
            setTransactions(transactions.filter(t => !selectedTransactions.includes(t._id)));
            setSelectedTransactions([]);
            setIsModalOpen(true); // Open modal on successful submission
        } catch (error) {
            console.error("Error submitting transactions:", error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                                                {selectedTransactions.includes(transaction._id) ? (
                                                    "Verified"
                                                ) : (
                                                    <button onClick={() => handleVerify(transaction._id)}>
                                                        Verify
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <button
                        className="submit-to-swift-button"
                        onClick={handleSubmitToSwift}
                        disabled={selectedTransactions.length === 0}>
                        Submit to SWIFT
                    </button>
                    
                    {/* New Button to Open Modal */}
                    <button className="open-modal-btn" onClick={openModal}>
                        Open Modal
                    </button>
                </div>
            </div>

            <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
            <ModalComponent isModalOpen={isModalOpen} closeModal={closeModal} bf={bf} />
            </div>
        </div>
    );
};

export default AdminDashboard;