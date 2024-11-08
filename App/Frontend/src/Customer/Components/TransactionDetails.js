// TransactionDetails.js
import React from 'react';

const TransactionDetails = ({ pay }) => {
    return (
        <tr>
            <td>{pay.userID || 'N/A'}</td>
            <td>{pay.amount}</td>
            <td>{pay.currency}</td>
            <td>{pay.accountNumber}</td>
        </tr>
    );
};

export default TransactionDetails;
