import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function MenuForm({isScrolled, toggleMenu, setPosition, locations }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    let inputTitle = searchTerm.replace(/\s+/g, ' ').trim();
    const result = locations.find((location) => location.title.toLowerCase() === inputTitle.toLowerCase())?.position;
    if (result) {
        setPosition([result[0] - 0.00000000000001, result[1]]);
        toggleMenu()
    } else {
      alert(`Объекта с названием "${inputTitle === '' ? "Пустотааа" : inputTitle}" нет на карте ;( `);
    }
    setSearchTerm('');
};

  return (
    <div className={`search ${isScrolled ? 'search--scrolled' : ''}`}>
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

export default MenuForm;
