import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'; // Import the stylesheet

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Logo - Can be replaced with an actual image */}
            <Link to="/" className="navbar-logo">
                BasicBank
            </Link>

            {/* Navigation links */}
            <div className="navbar-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/transaction">Transactions</Link>
                <Link to="/Register">Register</Link>
                <Link to="/Login">Login</Link>
            </div>

            {/* Profile dropdown for logged-in users */}
            <div className="navbar-profile">
                <button className="navbar-profile-button">
                    <img src="https://via.placeholder.com/30" alt="User Profile" />
                    John Doe {/* Placeholder name */}
                </button>

                {/* Profile dropdown menu */}
                <div className="navbar-profile-dropdown">
                    <Link to="/profile">Profile</Link>
                    <Link to="/settings">Settings</Link>
                    <Link to="/logout">Logout</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
