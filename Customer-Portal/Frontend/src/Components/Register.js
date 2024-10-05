import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import authService from '../Services/authService';
import { validateIDNumber, validateAccountNumber, validatePassword } from '../Utils/Validations';
import '../Styles/Register.css';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const user = {fullName, idNumber, accountNumber, password}

    
        
    

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const response = await fetch("http://localhost:3030/api/User/signup", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const json = await response.json()
    
        if (!validateIDNumber(idNumber)) {
            return setErrorMessage('Invalid ID Number');
        }
        if (!validateAccountNumber(accountNumber)) {
            return setErrorMessage('Invalid Account Number');
        }
        if (!validatePassword(password)) {
            return setErrorMessage('Password must be at least 8 characters with upper/lowercase letters, numbers, and special characters.');
        }
    
        if(!response.ok){
            setErrorMessage(json.error);
        }
        else{
            setFullName("")
            setIdNumber("")
            setAccountNumber("")
            setPassword("")
            setErrorMessage(null)
        }

    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1>Register</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="ID Number"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
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

                    <button type="submit">Register</button>
                </form>
                <a href="/login" className="small-text">Already have an account? Log in</a>
            </div>
        </div>
    );
};

export default Register;
