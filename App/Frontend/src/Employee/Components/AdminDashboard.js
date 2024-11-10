import React, { useEffect, useState } from 'react';
import bf from '../../moodeng.png';
import ModalComponent from "./VerifyBox"; 
import '../Styles/AdminDashboard.css';
import { getCsrfToken } from '../Services/csrfService';

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [swiftCode, setSwiftCode] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchUnverifiedTransactions = async () => {
      try {
        const csrfToken = await getCsrfToken();
        const response = await fetch("https://localhost:3030/api/Payment/UnverifiedPayments", {
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
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching unverified transactions:", error);
      }
    };

    fetchUnverifiedTransactions();
  }, []);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("https://localhost:3030/csrf-token", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleVerifyTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsVerifyModalOpen(true);
  };

  const handleVerifyModalConfirm = async () => {
    if (swiftCode.length >= 8 && swiftCode.length <= 11) {
      try {
        const response = await fetch(`https://localhost:3030/api/Payment/VerifyTransaction/${selectedTransaction._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "CSRF-Token": csrfToken, 
          },
          credentials: "include",
          body: JSON.stringify({ swiftCode }),
        });

        if (response.ok) {
          const updatedTransaction = await response.json();

          setTransactions(transactions.map(transaction =>
            transaction._id === updatedTransaction._id ? updatedTransaction : transaction
          ));

          setIsVerifyModalOpen(false);
          setIsModalOpen(true);
        } else {
          const errorData = await response.json();
          alert(errorData.error || "Failed to verify transaction.");
        }
      } catch (error) {
        console.error("Error verifying transaction:", error);
      }
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
                            className='modal-content-inp'
                        />
                        <button onClick={handleVerifyModalConfirm}>Confirm</button>
                        <button onClick={() => setIsVerifyModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {}
            {isModalOpen && selectedTransaction && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <ModalComponent
                            isModalOpen={isModalOpen}
                            closeModal={closeModal}
                            bf={bf}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
