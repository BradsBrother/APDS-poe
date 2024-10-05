import axios from 'axios';

const authService = {
    login: async (credentials) => {
        return await axios.post('/api/User/login', credentials);
    },
    signup: async (userData) => {
        return await axios.post('/api/User/signup', userData);
    },
    getRecentTransactions: async () => {
        return await axios.get('/api/Payment/Pay');
    },
    getRecentTransactions: async () => {
        return await axios.get('/api/User/logout');
    },
};

export default authService;
