// TransactionDetails.js
import React from 'react';

const TransactionDetails = ({ pay }) => {
    return (
        <tr>
            <td>{pay.currency}</td>
            <td>{pay.amount}</td>
            
            <td>{pay.acc_no}</td>
        </tr>
    );
};

export default TransactionDetails;
