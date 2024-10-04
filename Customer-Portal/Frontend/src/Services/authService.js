import axios from 'axios';

const API_URL = '/api/auth';

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};

const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export default {
    login,
    signup,
};
