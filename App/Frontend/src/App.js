import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Customer/Components/Navbar';
import Dashboard from './Customer/Components/Dashboard';
import UserLogin from './Customer/Components/Login';
import Register from './Customer/Components/Register';
import Transaction from './Customer/Components/Transaction';
import './App.css';
import ProtectedRoute from './Customer/Components/protectedRoute';
import AdminDashboard from './Employee/Components/AdminDashboard';
import Login from'./Employee/Components/Login';


function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/emplogin" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
                } 
              />
              <Route 
            path="/Employee" 
            element={
              <ProtectedRoute>
                <Navbar />
                <AdminDashboard />
              </ProtectedRoute>
                } 
              />
              <Route 
                path="/transaction" 
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Transaction />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          
        </Router>
    </div>
  );
}

export default App;
