import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import FilterModal from './FilterModal';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [userSneakers, setUserSneakers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [originalSneakers, setOriginalSneakers] = useState([]);
  const [filterBrand, setFilterBrand] = useState('');
  const [filterPriceMin, setFilterPriceMin] = useState('');
  const [filterPriceMax, setFilterPriceMax] = useState('');
  const [filterSize, setFilterSize] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const token = localStorage.getItem('token') || '';
  const userId = localStorage.getItem('userId') || '';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSneakers = async () => {
      console.log('userId:', userId);  
      console.log('token:', token);    
      if (!token || !userId) {
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('/api/sneakers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        const updatedSneakers = await Promise.all(response.data.sneakers.map(async (sneaker) => {
          const response = await axios.get(`/api/cart/check/${userId}/${sneaker.id}`);
          return { ...sneaker, isInCart: response.data.isInCart };
        }));
  
        setUserSneakers(updatedSneakers);
        setOriginalSneakers(updatedSneakers);
      } catch (error) {
        console.error('Ошибка при получении кроссовок:', error);
      }
    };
  
    fetchUserSneakers();
  }, [token, userId, navigate]);
  

  const handleAddToCart = async (sneakerId) => {
    if (!userId) {
      console.error('Ошибка: userId не определен');
      return;
    }
    console.log('Adding to cart:', { userId, productId: sneakerId });  

    try {
      await axios.post('/api/cart/add', { userId, productId: sneakerId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedSneakers = userSneakers.map(sneaker => {
        if (sneaker.id === sneakerId) {
          return { ...sneaker, isInCart: true };
        }
        return sneaker;
      });
      setUserSneakers(updatedSneakers);
    } catch (error) {
      console.error('Ошибка при добавлении в корзину:', error);
    }
  };

  const applyFilters = (sneaker) => {
    const brandMatch = !filterBrand || sneaker.brand.toLowerCase() === filterBrand.toLowerCase();
    const priceMatch = (!filterPriceMin || parseFloat(sneaker.price) >= parseFloat(filterPriceMin)) &&
      (!filterPriceMax || parseFloat(sneaker.price) <= parseFloat(filterPriceMax));
    const sizeMatch = !filterSize || sneaker.sizes.includes(filterSize);
    return brandMatch && priceMatch && sizeMatch;
  };

  const handleSearch = () => {
    const filteredSneakers = originalSneakers.filter(sneaker =>
      sneaker.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).filter(applyFilters);
    setUserSneakers(filteredSneakers);
  };

  const handleFilter = () => {
    setShowFilterModal(prevState => !prevState);
  };

  const handleClose = () => {
    setShowFilterModal(false);
  };

  const handleFilterApply = () => {
    setShowFilterModal(false);
    handleSearch();
  };

  const checkCartItem = async (userId, sneakerId) => {
    try {
      const key = `${userId}-${sneakerId}-checked`;
      if (localStorage.getItem(key)) {
        return;
      }
  
      const response = await axios.get(`/api/cart/check/${userId}/${sneakerId}`);
      const isInCart = response.data.isInCart;
      const updatedSneakers = userSneakers.map((sneaker) => {
        if (sneaker.id === sneakerId) {
          return { ...sneaker, isInCart };
        }
        return sneaker;
      });
      setUserSneakers(updatedSneakers);
  
      localStorage.setItem(key, 'true');
    } catch (error) {
      console.error('Ошибка при проверке наличия товара в корзине:', error);
    }
  };
  
  useEffect(() => {
    originalSneakers.forEach(async (sneaker) => {
      await checkCartItem(userId, sneaker.id);
    });
  }, [checkCartItem,originalSneakers,userId]);
  
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="search-container mb-3">
            <input
              type="text"
              placeholder="Поиск"
              className="search-input form-control"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="search-button btn btn-primary">Найти</button>
            <button onClick={handleFilter} className="search-button btn btn-primary">Фильтр</button>
          </div>
        </div>
      </div>
      <div className="row">
        {userSneakers.map((sneaker, index) => (
          <div key={index} className="col-md-4 mb-3 custom-col">
            <div className="card">
              <img src={sneaker.image_url} alt={sneaker.name} className="card-img-top sneaker-image" />
              <div className="card-body">
                <h5 className="card-title">{sneaker.name}</h5>
                <p className="card-text">Цена: {sneaker.price}</p>
                <p className="card-text">Размеры: {sneaker.sizes.split(',').map(size => size.trim()).join(', ')}</p>
                <button 
                  onClick={() => handleAddToCart(sneaker.id)} 
                  className={`add-to-cart-button btn btn-primary ${sneaker.isInCart ? 'disabled' : ''}`}
                  disabled={sneaker.isInCart}
                >
                  {sneaker.isInCart ? 'В корзине' : 'Добавить в корзину'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <FilterModal
        show={showFilterModal}
        handleClose={handleClose}
        handleFilterApply={handleFilterApply}
        filterBrand={filterBrand}
        setFilterBrand={setFilterBrand}
        filterPriceMin={filterPriceMin}
        setFilterPriceMin={setFilterPriceMin}
        filterPriceMax={filterPriceMax}
        setFilterPriceMax={setFilterPriceMax}
        filterSize={filterSize}
        setFilterSize={setFilterSize}
      />
    </div>
  );
};

export default Main;
