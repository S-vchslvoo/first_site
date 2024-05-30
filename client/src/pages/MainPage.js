import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import axios from 'axios';
import '../index.css';

const MainPage = () => {
  const [userSneakers, setUserSneakers] = useState([]);

  useEffect(() => {
    const fetchUserSneakers = async () => {
      try {
        const response = await axios.get('/api/sneakers');
        setUserSneakers(response.data.sneakers);
      } catch (error) {
        console.error('Ошибка при получении кроссовок:', error);
      }
    };
    

    fetchUserSneakers();
  }, []); 

  return (
    
    <div className="page-container">
      <Header />
      <div
      className="full-page-image"
      />

      
      <Main userSneakers={userSneakers} />
    </div>
  );
};

export default MainPage;
