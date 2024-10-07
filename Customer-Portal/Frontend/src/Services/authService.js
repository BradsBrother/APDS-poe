import axios from 'axios';

const authService = {
    
    
    getRecentTransactions: async () => {
        return await axios.get('/api/Payment/Pay');
    },
    getRecentTransactions: async () => {
        return await axios.get('/api/User/logout');
    },
};

export default authService;
