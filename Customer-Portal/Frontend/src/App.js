import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import Transaction from './Components/Transaction';
import { AuthProvider } from './Services/authContext';
import './App.css';
import ProtectedRoute from './Components/protectedRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <header>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Protect Dashboard and Transaction routes */}
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
          </header>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
