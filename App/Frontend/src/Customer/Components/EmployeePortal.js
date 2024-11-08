import React, { useContext } from 'react';
import TransactionContext from '../Services/TransactionContext';

const EmployeePortal = () => {
  const { transactions, verifyTransaction, submitToSwift } = useContext(TransactionContext);

  return (
    <div>
      <h2>Employee International Payments Portal</h2>
      <table>
        <thead>
          <tr>
            <th>Payee</th>
            <th>Account</th>
            <th>Amount</th>
            <th>SWIFT Code</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.payeeName}</td>
              <td>{transaction.payeeAccount}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.swiftCode}</td>
              <td>{transaction.verified ? 'Yes' : 'No'}</td>
              <td>
                {!transaction.verified && (
                  <button onClick={() => verifyTransaction(transaction._id)}>Verify</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={submitToSwift}>Submit Verified to SWIFT</button>
    </div>
  );
};

export default EmployeePortal;
