import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../index.css';

const AboutUs = () => {
  const token = localStorage.getItem('token') || '';
  const userId = localStorage.getItem('userId') || '';
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userId) {
      navigate('/login'); 
    }
  }, [token, userId, navigate]);
  
  return (
    <div className="page-container">
      <Header />
      <div className="about-section">
        <h2 className="section-title">О нас</h2>
        <p className="section-description">
          Магазин кроссовок "Red Style" - это место, где каждый находит свой идеальный стиль. Мы предлагаем широкий ассортимент кроссовок от лучших брендов, а также персонализированный сервис для каждого клиента.
        </p>
        <p className="section-description">
          Мы уверены, что кроссовки - это не просто обувь, это выражение вашего стиля и индивидуальности. Поэтому мы с гордостью представляем вам самые модные модели кроссовок по самым доступным ценам.
        </p>
        
        <div className="contact-info">
          <h3 className="section-subtitle">Контактная информация</h3>
          <p>Телефон: +375 (29) 859-14-76</p>
          <p>Email: info@redstyle.com</p>
          <p>Instagram: <a href="https://www.instagram.com/redstyle" target="_blank" rel="noopener noreferrer">redstyle</a></p>
        </div>

        <div className="location-map">
          <h3 className="section-subtitle">Мы находимся по адресу:</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2451.206248294862!2d23.689965176539655!3d52.09417787195269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47210bd3be88f683%3A0x96b6e85b7bde86dc!2zREDSTYLE!5e0!3m2!1sru!2sby!4v1715539220898!5m2!1sru!2sby"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            title="Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
