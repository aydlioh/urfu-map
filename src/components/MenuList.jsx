export default function MenuList( {instituteMap, clickVisit, createRoute, handleButtonClickBack, setIsScrolled, toggleMenu, setPosition, locations, setFilter} ) {

    if (!locations.length) {
        return (
            <div className="not-found-institute">Институты не найдены!</div>
        )
    }

    const handleSearch = (l) => {
        const result = l.position
        handleButtonClickBack()
        setFilter({...locations, query: ''})
        toggleMenu()
        setPosition([result[0], result[1]]);
    };
    
    const handleScroll = (event) => {
        const target = event.target;
        if (target.scrollTop > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
    };

    const handleMenuVisit = (l) => {
        clickVisit(l)
    };

    const handleMenuCreateRoute = (l) => {
        createRoute(l.position)
    };

    return ( 
        <div className="menu-items" onScroll={handleScroll}>
            {locations.map((l) => (
                <div
                    key={l.id}
                    className="menu-item"
                    onClick={() => handleSearch(l)}>
                    <div className="menu-item__title"> {l.title} </div>
                    <div className="menu-item__text"> {l.text} </div>
                    {!instituteMap &&
                        <div className="marker__btns">
                            <a onClick={() => handleMenuVisit(l)} className="marker__btn" href="#"  style={{ backgroundColor: l.color }}>Посетить</a>
                            <a onClick={() => handleMenuCreateRoute(l)} className="marker__btn" href="#"  style={{ backgroundColor: l.color }}>Маршрут</a>
                        </div>
                    }
                </div>
            ))}
        </div>
    );
}


