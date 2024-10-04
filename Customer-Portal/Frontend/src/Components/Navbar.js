import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth  } from '../Services/authContext'
import '../Styles/Navbar.css';

const Navbar = () => {
    const { isAuthenticated, login, logout } = useAuth();
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                BasicBank
            </Link>

            <div className="navbar-links">
                <Link to="/">Dashboard</Link>
                <Link to="/transaction">Transactions</Link>
                {!isAuthenticated ? (
                    <>
                        <Link to="/Register">Register</Link>
                        <Link to="/Login">Login</Link>
                    </>
                ) : (
                    // Show a button or link to logout if authenticated
                    <button onClick={logout} className="navbar-logout-button">Logout</button>
                )}
            </div>

            <div className="navbar-profile">
                {/* You might want to conditionally show user profile details here */}
                {isAuthenticated && (
                    <>
                        <button className="navbar-profile-button">
                            <img src="https://via.placeholder.com/30" alt="User Profile" />
                            Logged In
                        </button>

                        <div className="navbar-profile-dropdown">
                            <Link to="/logout">Logout</Link>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
