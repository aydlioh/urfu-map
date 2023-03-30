import React, { useState } from 'react';
import Footer from './components/Footer';
import MenuToggle from './components/MenuToggle';
import UrfuMap from "./Map";
import Menu from './Menu';
import "./index.css";


const locations = [
    { id: 1, title: 'ИРИТ-РТФ', position: [56.8408212141831,60.650870100687744], text: "Институт радиоэлектроники и информационных технологий-РТФ" },
    { id: 2, title: 'УрФУ', position: [56.84402578520124,60.65379538441558], text: "Главный Учебный Корпус" },
    { id: 3, title: 'ФТИ', position: [56.84272134350719,60.651752882212874], text: "Физико-технологический институт" },
    { id: 4, title: 'СК-11', position: [56.83757683350624,60.656424837172274], text: "Общежитие № 11"},
    { id: 5, title: 'УГИ', position: [56.84044615824193,60.61618275612711], text: "Мяу Мяу Девочки с Уги <3"}
];

function App() {
    const [position, setPosition] = useState([56.84384143906293,60.65234332360141]);
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className='app'>
            <UrfuMap setPosition={setPosition} position={position} locations={locations} />
            <MenuToggle setMenuOpen={setMenuOpen} menuOpen={menuOpen} toggleMenu={toggleMenu} />
            <Menu className={`menu ${menuOpen ? 'open' : ''}`}  setPosition={setPosition} locations={locations} />
            <Footer/>
        </div>
    );
}

export default App;