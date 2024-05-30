import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import MainPage from './pages/MainPage';
import AdminPage from './components/AdminPage';
import AboutUs from './components/AboutUs';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import AdminRoute from './AdminRoute';
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <div id="root">
        <Router>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/exit" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
              <Route path="/about" element={<AboutUs />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
