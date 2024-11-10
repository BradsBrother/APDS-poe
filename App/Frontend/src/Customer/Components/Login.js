import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { getCsrfToken } from '../Services/csrfService';

const UserLogin = () => {
    const [fullName, setFullName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
      
        const user = {
            name: fullName,
            acc_no: accountNumber,
            password,
        };
      
        try {
            // Fetch CSRF token first
            const csrfToken = await getCsrfToken();
            // Make login request with the CSRF token
            const response = await fetch("https://localhost:3030/api/User/login", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                    "CSRF-Token": csrfToken,  // Include CSRF token
                },
                credentials: "include",
            });
        
            // Check if the response is not OK (e.g., status 400/500)
            if (!response.ok) {
                // Try to extract the error from response JSON
                setErrorMessage("Incorrect login details");
                return; 
            }
            
            // On successful response, navigate to dashboard
            navigate("/dashboard");
        
        } catch (error) {        
           
            setErrorMessage("An error occurred while logging in. Please try again later.");
        }        
    };
    
    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // New function to navigate to the employee login page
    const navigateToEmployeeLogin = () => {
        navigate("/emplogin");
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
                        <button
                            type="button" // Prevents form submission
                            className="password-toggle-icon"
                            onClick={togglePasswordVisibility}
                            aria-label="Toggle password visibility"
                        >
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <button type="submit" className='btn'>Login</button>
                </form>
                <a href="/register" className="small-text">Don't have an account? Register</a>
                
                {}
                <button 
                    onClick={navigateToEmployeeLogin} 
                    className="employee-login-button btn"
                    style={{ marginTop: '20px', padding: '10px 15px', cursor: 'pointer' }}
                >
                    Go to Employee Login
                </button>
            </div>
        </div>
    );
};

export default UserLogin;
