import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import UrfuMap from "./Map";
import Menu from './Menu';

const locations = [
    { id: 1, title: 'ИРИТ-РТФ', position: [56.8408212141831,60.650870100687744], text: "RADIOFUCKFUFUCKFCUFUC" },
    { id: 2, title: 'УрФУ', position: [56.84402578520124,60.65379538441558], text: "Главный Учебный Кшарага" },
    { id: 3, title: 'ФТИ', position: [56.84272134350719,60.651752882212874], text: "Mesto Obytaniya Daunov" },
    { id: 4, title: 'СК-11', position: [56.83757683350624,60.656424837172274], text: "Тараканье логово"},
    { id: 5, title: 'ЧЗХ Тимлид?!', position: [56.83369559643219,60.64982655036045], text: "Когда ТЗ?"},
    { id: 6, title: 'УГИ', position: [56.84044615824193,60.61618275612711], text: "Мяу Мяу Девочки с Уги <3"}
];

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

    return (
        <div className='app'>
            <UrfuMap setPosition={setPosition} position={position} locations={locations} />
            <button className='menu-toggle' onClick={toggleMenu}>
                {menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            </button>
            <div className={`menu-popup ${menuOpen ? 'open' : ''}`}>
                <Menu setPosition={setPosition} locations={locations} />
            </div>
            <Footer/>
        </div>
    );
}

export default App;
