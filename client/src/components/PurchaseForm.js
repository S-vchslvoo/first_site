import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const PurchaseForm = ({ item, onClose, removeItemFromCart }) => {
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    street: '',
    houseNumber: '',
    phone: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token') || '';
        const userId = localStorage.getItem('userId') || '';
        const response = await axios.get(`/api/cart/purchase/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const purchaseData = response.data;
        console.log('Purchase data:', purchaseData);

        if (purchaseData && purchaseData.phone) {
          setFormData({
            country: purchaseData.country || '',
            city: purchaseData.city || '',
            street: purchaseData.street || '',
            houseNumber: purchaseData.house_number || '',
            phone: purchaseData.phone || ''
          });
        }
      } catch (error) {
        console.error('Ошибка при получении данных о покупке:', error);
      }
    };

    fetchData();
  }, [item.id, onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemove = async (userId, token, itemId) => {
    try {
      const response = await axios.delete(`/api/cart/remove/${userId}/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        removeItemFromCart(itemId);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || '';
    const userId = localStorage.getItem('userId') || '';

    console.log('Form data:', {
      userId,
      ...formData
    });

    try {
      const response = await axios.post('/api/cart/purchase', {
        userId,
        ...formData
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        await handleRemove(userId, token, item.id);
        alert('Покупка успешно оформлена');
        onClose();
      }
    } catch (error) {
      console.error('Ошибка при оформлении покупки:', error);
      alert('Ошибка при оформлении покупки');
    }
  };

  return (
    <div className="purchase-form">
      <div className="purchase-form-container">
        <h3 className="text-center">Оформление покупки</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Страна</label>
            <input 
              type="text" 
              name="country" 
              value={formData.country} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Город</label>
            <input 
              type="text" 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Улица</label>
            <input 
              type="text" 
              name="street" 
              value={formData.street} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Номер дома</label>
            <input 
              type="text" 
              name="houseNumber" 
              value={formData.houseNumber} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Номер телефона</label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-success mr-2">Оформить покупку</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;
