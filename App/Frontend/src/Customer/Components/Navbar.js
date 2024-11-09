import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import { useState, useEffect } from 'react';
import { getCsrfToken } from '../Services/csrfService';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isDropdownVisible, setisDropdownVisible] = useState(false);

  const logoutUser = async () => {
    const csrfToken = await getCsrfToken();

    const response = await fetch("https://localhost:3030/api/User/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'CSRF-Token': csrfToken,
      },
      credentials: "include",
    });

    navigate("/");
    setisAuthenticated(false);

    return response;
  };

  const checkAuthStatus = async () => {
    try {
      const csrfToken = await getCsrfToken();
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
        console.log("User is not authenticated");
        return false;  // User is not authenticated
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
      return false;  // Handle errors gracefully
    }
  };

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authStatus = await checkAuthStatus();
      setisAuthenticated(authStatus);
    };

    fetchAuthStatus();
  }, []);

  return (
    <nav className={`navbar ${isAuthenticated ? 'navbar-logged-in' : ''}`}>
      <Link to="/" className="navbar-logo">BasicBank</Link>

      {isAuthenticated ? (
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/transaction">Transactions</Link>

          <div className="navbar-profile">
            <button
              className="navbar-profile-button"
              onClick={() => setisDropdownVisible(!isDropdownVisible)}
            >
              <img src="https://via.placeholder.com/30" alt="User Profile" />
              Log Out
            </button>

            {isDropdownVisible && (
              <div className="navbar-profile-dropdown">
                <Link to="/profile">Profile</Link>
                <button onClick={logoutUser}>Log Out</button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
