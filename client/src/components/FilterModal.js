import React from 'react';
import '../index.css';

const FilterModal = ({ show, handleClose, handleFilterApply, filterBrand, setFilterBrand, filterPriceMin, setFilterPriceMin, filterPriceMax, setFilterPriceMax, filterSize, setFilterSize }) => {

    if (!show) {
      return null;
    }
  
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleClose}>&times;</span>
          <h2>Фильтр</h2>
          <form>
            <div className="form-group">
              <label htmlFor="filterBrand">Бренд:</label>
              <input type="text" id="filterBrand" className="form-control" value={filterBrand} onChange={e => setFilterBrand(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="filterPriceMin">Минимальная цена:</label>
              <input type="number" id="filterPriceMin" className="form-control" value={filterPriceMin} onChange={e => setFilterPriceMin(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="filterPriceMax">Максимальная цена:</label>
              <input type="number" id="filterPriceMax" className="form-control" value={filterPriceMax} onChange={e => setFilterPriceMax(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="filterSize">Размер:</label>
              <input type="text" id="filterSize" className="form-control" value={filterSize} onChange={e => setFilterSize(e.target.value)} />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleFilterApply}>Применить</button>
          </form>
        </div>
      </div>
    );
  };
  

export default FilterModal;
