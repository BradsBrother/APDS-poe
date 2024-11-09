import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import { useState, useEffect } from 'react';
import { getCsrfToken } from '../Services/csrfService';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logoutUser = async () => {
    const csrfToken = await getCsrfToken()

    const response = await fetch("https://localhost:3030/api/User/logout", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'CSRF-Token': csrfToken,
      },
      credentials: "include",
    });
  
    navigate("/")
    setIsAuthenticated(false)
  
    return response
  }

  const checkAuthStatus = async () => {
    try {
      const csrfToken = await getCsrfToken()
        const response = await fetch('https://localhost:3030/api/User/auth-status', {
            method: 'GET',
            credentials: 'include',  // Include cookies in the request
            headers: {
              "CSRF-Token": csrfToken,
            }
        });
  
        if (response.ok) {
            const data = await response.json();
            console.log("User is authenticated:", data);
            return true;  // User is authenticated
        } else {
            // If the response is not ok (status 401 or 403)
            console.log("User is not authenticated");
            return false;  // User is not authenticated
        }
    } catch (error) {
        console.error("Error checking authentication status:", error);
        return false;  // Handle errors gracefully
    }
  };
  
  // Check auth status on component mount
  useEffect(() => {
    const fetchAuthStatus = async () => {
        const authStatus = await checkAuthStatus();
        setIsAuthenticated(authStatus);
    };

    fetchAuthStatus();
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">BasicBank</Link>

      <div className="navbar-links">
        {!isAuthenticated ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/">Login</Link>
            <Link to="/emplogin">Employee Login</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/transaction">Transactions</Link>
          </>
        )}
      </div>

      <div className="navbar-profile">
        {isAuthenticated && (
          <>
            <button className="navbar-profile-button" onClick={logoutUser}>
              <img src="https://via.placeholder.com/30" alt="User Profile" />
              Log Out
            </button>
            <div className="navbar-profile-dropdown">
              <Link to="/" onClick={logoutUser}>Logout</Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
