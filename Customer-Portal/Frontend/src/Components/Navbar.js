import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

const logoutUser = async () => {
  const response = await fetch("https://localhost:3030/api/User/logout", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response
}

const Navbar = () => {
  const isAuthenticated = false
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">BasicBank</Link>

      <div className="navbar-links">
        {!isAuthenticated ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/">Login</Link>
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
              Logged Out
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
