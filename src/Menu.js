import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Geocode from 'react-geocode'
import './index.css';

function Menu(props) {
    const [searchTerm, setSearchTerm] = useState(''); // храним строку поиска в состоянии компонента

    const handleSearch = (event) => {
      event.preventDefault(); // предотвращаем перезагрузку страницы при отправке формы
  
      Geocode.fromAddress(searchTerm).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          props.handleSearch([lat, lng]);
          alert("Good");
           // вызываем функцию обработчик из родительского компонента и передаем в нее координаты
        },
        (error) => {
          alert(error);
        }
      );
    };

    return (
    <div className="menu">
        <form className="search-form" onSubmit={handleSearch}>
            <div className="search-container">
                <input
                type="text"
                placeholder="Поиск"
                className="search-input"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button type="submit" className="search-button">
                <FaSearch />
                </button>
            </div>
        </form>
    </div>
  );
}

export default Menu;