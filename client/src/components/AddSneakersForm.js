import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddSneakersForm = () => {
  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    imageUrl: '',
    sizes: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/sneakers', formData);
      alert('Кроссовки успешно добавлены!');
    } catch (error) {
      console.error('Ошибка при добавлении кроссовок:', error);
      alert('Ошибка при добавлении кроссовок. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="sneakers-form-container">
          <form className="sneakers-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label"></label>
              <input
                type="text"
                name="brand"
                className="form-control"
                placeholder="Введите бренд"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label"></label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Введите название"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label"></label>
              <input
                type="text"
                name="imageUrl"
                className="form-control"
                placeholder="Введите URL изображения"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
              {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="img-fluid mt-2 image-preview" />}
            </div>
            <div className="mb-3">
              <label className="form-label"></label>
              <input
                type="text"
                name="sizes"
                className="form-control"
                placeholder="Введите доступные размеры"
                value={formData.sizes}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label"></label>
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Введите цену"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">Добавить кроссовки</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSneakersForm;
