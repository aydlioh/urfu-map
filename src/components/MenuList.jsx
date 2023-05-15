export default function MenuList( {handleButtonClickBack, setIsScrolled, toggleMenu, setPosition, locations} ) {

    const handleSearch = (l) => {
        const result = l.position
        handleButtonClickBack()
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

    return ( 
        <div className="menu-items" onScroll={handleScroll}>
            {locations.map((l) => (
                <div
                    key={l.id}
                    className="menu-item"
                    onClick={() => handleSearch(l)}>
                    <div className="menu-item__title"> {l.title} </div>
                    <div className="menu-item__text"> {l.text} </div>
                </div>
            ))}
        </div>
    );
}


