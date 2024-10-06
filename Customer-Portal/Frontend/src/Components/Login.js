import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Login.css';

const Login = () => {
    const [fullName, setFullName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const user = { fullName, accountNumber, password };
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch("https://localhost:3030/api/User/login", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies if needed
            });

            // Check response status
            if (!response.ok) {
                const json = await response.json();
                setErrorMessage(json.error || 'An error occurred. Please try again.');
                return;
            }

            setErrorMessage(null);
        } catch (error) {
            console.error("Error during fetch:", error);
            setErrorMessage("An error occurred while logging in. Please try again later.");
        }
    };
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                    <div className="password-container">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                                className="password-toggle-icon"
                                onClick={togglePasswordVisibility}
                            >
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <a href="/register" className="small-text">Don't have an account? Register</a>
            </div>
        </div>
    );
};

export default Login;
