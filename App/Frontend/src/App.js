import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import Transaction from './Components/Transaction';
import './App.css';
import ProtectedRoute from './Components/protectedRoute';
import AdminDashboard from './Components/AdminDashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
                } 
              />
              <Route 
                path="/transaction" 
                element={
                  <ProtectedRoute>
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
