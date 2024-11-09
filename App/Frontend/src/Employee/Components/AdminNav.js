import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/AdminNav.css';
import { getCsrfToken } from '../Services/csrfService';

const AdminNav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const csrfToken = await getCsrfToken();
      const response = await fetch('https://localhost:3030/api/Employee/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken,
        },
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/emplogin'); // Redirect to login page after successful logout
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="admin-nav">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </nav>
  );
};

export default AdminNav;
