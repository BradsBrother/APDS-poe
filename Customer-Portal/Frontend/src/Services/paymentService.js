import axios from 'axios';

export const makePayment = async (paymentData) => {
    return await axios.post('/api/Payment/Pay', paymentData);
};
