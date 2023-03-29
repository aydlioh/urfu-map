import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function MenuForm({ setPosition, locations }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    let inputTitle = searchTerm.replace(/\s+/g, ' ').trim();
    const result = locations.find((location) => location.title.toLowerCase() === inputTitle.toLowerCase())?.position;
    if (result) {
        setPosition(result);
    } else {
      alert(`Объекта с названием "${inputTitle === '' ? "Пустотааа" : inputTitle}" нет на карте ;( `);
    }
    setSearchTerm('');
};

  return (
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
  );
}

export default MenuForm;
