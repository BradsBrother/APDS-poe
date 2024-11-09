import React, { useState } from 'react';
import '../Styles/EmployeeLogin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getCsrfToken } from '../Services/csrfService';

const Login = () => {
  const [employeeId, setEmployeeId] = useState(''); // Updated state name
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const Employee = {
      employee_id: employeeId,
      password,
    };
  
    try {
      const csrfToken = await getCsrfToken();
      const response = await fetch("https://localhost:3030/api/Employee/login", {
        method: "POST",
        body: JSON.stringify(Employee),
        headers: {
          "Content-Type": "application/json",
          "CSRF-Token": csrfToken,
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Invalid employee ID or password');
      }
  
      const data = await response.json();
      console.log('Login successful:', data);
      navigate("/Employee");
    } catch (error) {
      setErrorMessage(error.message || 'Invalid employee ID or password. Please try again.');
    }
  };
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
};

  return (
    <div className='moodeng'>
      <div className="emplogin-container">
        <h1 className="login-title">Basic Bank</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="employeeId" className="login-label">Employee ID</label>
          <input
            type="text"
            id="employeeId"
            className="login-input"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter your employee ID"
            required
          />

          <label htmlFor="password" className="login-label">Password</label>
          <div className="password-container">
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <span
                            className="password-toggle-icon"
                            onClick={togglePasswordVisibility}
                        >
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                        </span>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
