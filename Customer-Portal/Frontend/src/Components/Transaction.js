import React, { useState } from 'react';
import '../Styles/Transaction.css'; 

const Transaction = () => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');

    const handlePayment = (e) => {
        e.preventDefault();
        alert(`Payment of $${amount} sent to ${recipient}`);
    };

    return (
        <div className="transaction-container">
            <div className="transaction-box">
                <h1>Send a Payment</h1>
                <form onSubmit={handlePayment}>
                    <input
                        type="text"
                        placeholder="Recipient Name"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <button type="submit">Send Payment</button>
                </form>
            </div>
        </div>
    );
};

export default Transaction;
