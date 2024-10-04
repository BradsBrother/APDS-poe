import axios from 'axios';

const authService = {
    login: async (credentials) => {
        return await axios.post('/api/auth/login', credentials);
    },
    signup: async (userData) => {
        return await axios.post('/api/auth/register', userData);
    },
    getAccountOverview: async () => {
        return await axios.get('/api/user/overview');
    },
    getRecentTransactions: async () => {
        return await axios.get('/api/user/transactions');
    }
};

export default authService;
