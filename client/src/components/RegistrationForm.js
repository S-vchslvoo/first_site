import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); 

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
      const response = await axios.post('/api/auth/registration', formData);
      console.log('Ответ от сервера:', response.data);
      setIsRegistered(true);
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
      setError('Ошибка при регистрации. Попробуйте еще раз.');
    }
  };

  if (isRegistered) {
    return <Navigate to="/main" />;
  }

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
          <label className="form-label" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
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
        <button type="submit" className="form-submit">Зарегистрироваться</button>
        <p>У вас есть аккаунт? <Link to="/login">Войти</Link></p>
      </form>
    </div>
  );
};

export default RegistrationForm;
