import React, { useState } from 'react';
import axios from 'axios';
import '../index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const EditSneakersForm = ({ sneaker, onUpdate, onCancel }) => {
    const [name, setName] = useState(sneaker.name);
    const [price, setPrice] = useState(sneaker.price);
    const [sizes, setSizes] = useState(sneaker.sizes);
    const [image_url, setImageUrl] = useState(sneaker.image_url);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/sneakers/edit/sneakers/${sneaker.id}`, {
                name,
                price,
                sizes,
                image_url,
            });
            onUpdate({ ...sneaker, name, price, sizes, image_url });
            alert('Кроссовки успешно обновлены!');
        } catch (error) {
            console.error('Ошибка при обновлении кроссовок:', error);
            alert('Ошибка при обновлении кроссовок. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="sneakers-form-container">
                    <form className="sneakers-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Название</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Цена</label>
                            <input
                                type="number"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Размеры</label>
                            <input
                                type="text"
                                className="form-control"
                                value={sizes}
                                onChange={(e) => setSizes(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">URL изображения</label>
                            <input
                                type="text"
                                className="form-control"
                                value={image_url}
                                onChange={(e) => setImageUrl(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Сохранить</button>
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>Отмена</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditSneakersForm;
