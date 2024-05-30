import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Header';
import axios from 'axios';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PurchaseForm from '../components/PurchaseForm';

const Cart = () => {
  const token = localStorage.getItem('token') || '';
  const userId = localStorage.getItem('userId') || '';
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    console.log('userId:', userId);  
    console.log('token:', token); 
    if (!token || !userId) {
      navigate('/login'); 
    } else {
      fetchCartItems();
    }
  }, [token, userId, navigate]); 

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems(response.data);
    } catch (error) {
      console.error('Ошибка при получении содержимого корзины:', error);
    }
  };

  const handleBuy = (item) => {
    setSelectedItem(item);
  };

  const handleRemove = async (itemId) => {
    try {
      const response = await axios.delete(`/api/cart/remove/${userId}/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error);
    }
  };

  const closePurchaseForm = () => {
    setSelectedItem(null);
  };

  return (
    <div className="page-container">
      <Header />
      <div className="full-page-image" />
      <div className="container">
        <h2 className="mt-4">Ваши товары</h2>
        <div className="row">
          {cartItems.map((item, index) => (
            <div key={index} className="col-md-4 mb-3 custom-col">
              <div className="card">
                <img src={item.image_url} alt={item.name} className="card-img-top sneaker-image" />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Цена: {item.price}</p>
                  <p className="card-text">Размеры: {item.sizes}</p>
                  <button 
                    onClick={() => handleBuy(item)} 
                    className="btn btn-primary mr-2"
                  >
                    Купить
                  </button>
                  <button 
                    onClick={() => handleRemove(item.id)} 
                    className="btn btn-danger"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedItem && (
          <PurchaseForm 
          item={selectedItem} 
          onClose={closePurchaseForm} 
          removeItemFromCart={handleRemove}
          />        )}
      </div>
    </div>
  );
};

export default Cart;
