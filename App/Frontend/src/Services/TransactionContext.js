import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await axios.get('/api/transactions');
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  const verifyTransaction = async (transactionId) => {
    await axios.post(`/api/transactions/${transactionId}/verify`);
    setTransactions(transactions.map(txn => txn._id === transactionId ? { ...txn, verified: true } : txn));
  };

  const submitToSwift = async () => {
    await axios.post('/api/transactions/submit-to-swift');
    setTransactions(transactions.filter(txn => txn.status !== 'submitted'));
  };

  return (
    <TransactionContext.Provider value={{ transactions, verifyTransaction, submitToSwift }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
