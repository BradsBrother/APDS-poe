const TransactionDetails = ({ pay }) => {
    return (
        <tr>
            <td>{(pay.amount / 100).toFixed(2)} {pay.currency}</td>
            <td>{pay.currency}</td>
            <td>{pay.acc_no}</td>
        </tr>
    );
};
export default TransactionDetails;