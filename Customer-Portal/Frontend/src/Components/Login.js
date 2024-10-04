import React, { useState } from 'react';
import authService from '../Services/authService';
import '../Styles/Login.css';

const Login = () => {
    const [idNumber, setIdNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        setErrorMessage('');

        try {
            await authService.login({ idNumber, password });
            alert('Login successful');
        } catch (error) {
            setErrorMessage('Invalid ID number or password');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="ID Number"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <a href="/register" className="small-text">Don't have an account? Register</a>
            </div>
        </div>
    );
};

export default Login;
