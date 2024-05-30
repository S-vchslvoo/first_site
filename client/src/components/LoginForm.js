import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const LoginForm = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const { handleSuccessfulLogin } = useContext(AuthContext); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      console.log('Ответ от сервера:', response.data);
      const { token, userId, isAdmin } = response.data;

      if (!response.data) {
        console.error('Данные от сервера не получены');
        setError('Ошибка при входе. Попробуйте еще раз.');
        return;
      }
      
      handleSuccessfulLogin(token, userId, isAdmin); 

      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/main');
      }
      
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
      setError('Ошибка при входе. Проверьте правильность введенных данных.');
    }
  };

  return (
    <div className="container_form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="form-submit">Войти</button>
      </form>
      <p>У вас нет аккаунта? <Link to="/registration">Зарегистрироваться</Link></p>
    </div>
  );
};

export default LoginForm;
