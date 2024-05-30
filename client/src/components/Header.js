import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../index.css';

const Header = () => {
  const { isAdmin, handleLogout } = useContext(AuthContext);
  const location = useLocation();

  const logout = () => {
    handleLogout();
    window.location.href = '/login';
  };



  return (
    <header className="header">
      <nav className="nav">
        <ul>
          {!isAdmin && (
            <>
              <li><Link to="/main" className="nav-link">Главная</Link></li>
              <li><Link to="/about" className="nav-link">О нас</Link></li>
              <li><Link to="/cart" className="nav-link">Корзина</Link></li>
            </>
          )}
          <li><Link to="/" className="nav-link" onClick={logout}>Выход</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
