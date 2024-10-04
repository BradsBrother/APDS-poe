import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'
import Transaction from './Components/Transaction'
import { AuthProvider } from './Services/authContext'
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
      <Navbar />
      <header>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Transaction' element={<Transaction />} />
      </Routes>
      </header>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
