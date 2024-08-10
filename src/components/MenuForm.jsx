import { FaSearch } from 'react-icons/fa';

export function MenuForm({
  filter,
  setFilter,
  handleButtonClickBack,
  isScrolled,
  toggleMenu,
  setPosition,
  locations,
}) {
  const handleSearch = (event) => {
    event.preventDefault();
    let inputTitle = filter.query.replace(/\s+/g, ' ').trim();
    const result = locations.find(
      (location) => location.title.toLowerCase() === inputTitle.toLowerCase()
    )?.position;
    if (result) {
      setPosition([result[0], result[1]]);
      toggleMenu();
      handleButtonClickBack();
    } else {
      alert(
        `Объекта с названием "${
          inputTitle === '' ? 'пустота' : inputTitle
        }" нет на карте `
      );
    }
    setFilter({ ...filter, query: '' });
  };

  return (
    <div className={`search ${isScrolled ? 'search--scrolled' : ''}`}>
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск"
            className="search-input"
            value={filter.query}
            onChange={(e) => setFilter({ ...filter, query: e.target.value })}
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
}
