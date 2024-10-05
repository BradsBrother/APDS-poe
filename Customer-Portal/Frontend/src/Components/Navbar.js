import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Services/authContext';
import '../Styles/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
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
            <button className="navbar-profile-button" onClick={logout}>
              <img src="https://via.placeholder.com/30" alt="User Profile" />
              Logged In
            </button>
            <div className="navbar-profile-dropdown">
              <Link to="/" onClick={logout}>Logout</Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
