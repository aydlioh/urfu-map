import React, { useState } from 'react';
import Footer from './components/Footer';
import MenuToggle from './components/MenuToggle';
import UrfuMap from "./Map";
import Menu from './Menu';
import "./index.css";
import Loader from './components/Loader';


const locations = [
    { id: 1, title: 'ИРИТ-РТФ', position: [56.8408212141831,60.650870100687744], text: "Институт радиоэлектроники и информационных технологий-РТФ" },
    { id: 2, title: 'УрФУ', position: [56.84402578520124,60.65379538441558], text: "Главный Учебный Корпус" },
    { id: 3, title: 'ФТИ', position: [56.84272134350719,60.651752882212874], text: "Физико-технологический институт" },
    { id: 4, title: 'СК-11', position: [56.83757683350624,60.656424837172274], text: "Общежитие № 11"},
    { id: 5, title: 'УГИ', position: [56.84044615824193,60.61618275612711], text: "Мяу Мяу Девочки с Уги <3"},
    { id: 8, title: 'ФТИ 228', position: [56.84292134350719,60.651752882212874], text: "Физико-технологический институт 228" },
    { id: 9, title: 'ФТИ 322', position: [56.84472134350719,60.651752882212874], text: "Физико-технологический институт solo 322" },
    { id: 11, title: 'ФТИ 666', position: [56.84372134350719,60.651752882212874], text: "Физико-технологический институт дьявола" },
    { id: 12, title: 'ФТИ 666', position: [56.84372134350719,60.651752882212874], text: "Физико-технологический институт дьявола" },
    { id: 13, title: 'ФТИ 666', position: [56.84372134350719,60.651752882212874], text: "Физико-технологический институт дьявола" },

];

function App() {
    const [position, setPosition] = useState([56.84384143906293,60.65234332360141]);
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <>
            <Loader />
            <div className='app'>
                <UrfuMap position={position} locations={locations} />
                <MenuToggle toggleMenu={toggleMenu} menuOpen={menuOpen}/>
                <Menu toggleMenu={toggleMenu} className={`menu ${menuOpen ? 'open' : ''}`}  setPosition={setPosition} locations={locations} />
                <Footer/>
            </div>
        </>
    );
}

export default App;