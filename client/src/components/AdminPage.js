import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSneakersForm from '../components/AddSneakersForm';
import EditSneakersForm from '../components/EditSneakersForm';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const AdminPage = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [sneakers, setSneakers] = useState([]);
    const [editSneaker, setEditSneaker] = useState(null);

    useEffect(() => {
        const fetchSneakers = async () => {
            try {
                const response = await axios.get('/api/sneakers');
                if (Array.isArray(response.data.sneakers)) {
                    setSneakers(response.data.sneakers);
                } else {
                    console.error('Полученные данные не являются массивом:', response.data);
                }
            } catch (error) {
                console.error('Ошибка при загрузке кроссовок:', error);
            }
        };

        fetchSneakers();
    }, []);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
        setEditSneaker(null);
    };

    const handleEditClick = (sneaker) => {
        setEditSneaker(sneaker);
        setIsFormVisible(false);
    };

    const handleDeleteClick = async (sneakerId) => {
        try {
            await axios.delete(`/api/sneakers/delete/sneakers/${sneakerId}`);
            setSneakers(sneakers.filter(s => s.id !== sneakerId));
            alert('Кроссовки успешно удалены!');
        } catch (error) {
            console.error('Ошибка при удалении кроссовок:', error);
            alert('Ошибка при удалении кроссовок. Пожалуйста, попробуйте еще раз.');
        }
    };

    const handleUpdateSneaker = (updatedSneaker) => {
        setSneakers(sneakers.map(s => (s.id === updatedSneaker.id ? updatedSneaker : s)));
        setEditSneaker(null);
        setIsFormVisible(false);
    };

    const handleCancelEdit = () => {
        setEditSneaker(null);
    };

    return (
        <div className="page-container">
            <Header />
            <h1 className="text-center mt-4" style={{ color: 'black' }}>Административная панель</h1>
            <div className="text-center">
                <button
                    onClick={toggleFormVisibility}
                    className="btn btn-primary mb-3"
                    style={{ width: 'auto', maxWidth: '200px' }}
                >
                    {isFormVisible ? 'Скрыть форму' : 'Добавить кроссовки'}
                </button>
            </div>
            {isFormVisible && !editSneaker && <div className="mt-4"><AddSneakersForm /></div>}
            {editSneaker && (
                <div className="mt-4">
                    <EditSneakersForm
                        sneaker={editSneaker}
                        onUpdate={handleUpdateSneaker}
                        onCancel={handleCancelEdit}
                    />
                </div>
            )}
            <div className="container mt-4">
                <div className="row">
                    {sneakers.map((sneaker, index) => (
                        <div key={index} className="col-md-4 mb-3 custom-col">
                            <div className="card">
                                <img src={sneaker.image_url} alt={sneaker.name} className="card-img-top sneaker-image" />
                                <div className="card-body">
                                    <h5 className="card-title">{sneaker.name}</h5>
                                    <p className="card-text">Цена: {sneaker.price}</p>
                                    <p className="card-text">Размеры: {sneaker.sizes.split(',').map(size => size.trim()).join(', ')}</p>
                                    <button onClick={() => handleEditClick(sneaker)} className="btn btn-warning mr-2">Редактировать</button>
                                    <button onClick={() => handleDeleteClick(sneaker.id)} className="btn btn-danger">Удалить</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
