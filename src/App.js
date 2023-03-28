import React, { useState, useEffect } from 'react';
import Map from "./Map";
import Menu from './Menu';

function App() {
    const [position, setPosition] = useState([56.84384143906293,60.65234332360141]);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleSearch = (newPosition) => {
        setPosition(newPosition);
    };

    return (
        <div className='app'>
            <Map position={position} />
            <button className='menu-toggle' onClick={toggleMenu}>
                {menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            </button>
            <div className={`menu-popup ${menuOpen ? 'open' : ''}`}>
                <Menu handleSearch={handleSearch} />
            </div>
        </div>
    );
}

export default App;
