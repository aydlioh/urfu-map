import React, { useState } from 'react';
import Footer from './components/Footer';
import MenuToggle from './components/MenuToggle';
import UrfuMap from "./Map";
import Menu from './Menu';
import "./index.css";
import Loader from './components/Loader';


const locations = [
    { id: 51, color: "rgb(234, 94, 115)", title: 'УГИ', position: [56.84044615824193,60.61618275612711], text: "Уральский гуманитарный институт"},
    { id: 52, color: "rgb(44, 121, 50)", title: 'ИЕНиМ', position: [56.84110615824193,60.61482275612711], text: "Институт естественных наук и математики"},
    { id: 1, color: "rgb(106, 178, 227)", title: 'ИРИТ-РТФ', position: [56.8408212141831,60.650870100687744], text: "Институт радиоэлектроники и информационных технологий-РТФ" },
    { id: 2, color: "rgb(224, 149, 43)", title: 'УрФУ', position: [56.84402578520124,60.65379538441558], text: "Главный Учебный Корпус" },
    { id: 3, color: "rgb(227, 30, 36)", title: 'ФТИ', position: [56.84272134350719,60.651752882212874], text: "Физико-технологический институт" },
    { id: 4, color: "rgb(155, 33, 29)", title: 'ИНМиТ', position: [56.84234134350719,60.649885882212874], text: "Институт новых материалов и технологий" },
    { id: 5, color: "rgb(149, 193, 43)", title: 'ХТФ', position: [56.84217534350719,60.648295882212874], text: "Химико-технологический институт" },
    { id: 6, color: "rgb(178, 52, 53)", title: 'ИСиА', position: [56.84503134350719,60.650532882212874], text: "Институт строительства и архитектуры" },
    { id: 7, color: "rgb(178, 52, 53)", title: 'СП', position: [56.84502134350719,60.651732882212874], text: "СФ УрФУ" },
    { id: 8, color: "rgb(161, 39, 131)", title: 'УралЭНИН', position: [56.84465134350719,60.652052882212874], text: "Уральский энергетический институт" },
    { id: 9, color: "rgb(0, 158, 187)", title: 'ИнЭУ', position: [56.84310134350719,60.652652882212874], text: "Институт экономики и управления" },
    { id: 10, color: "rgb(224, 149, 43)", title: 'ТЭФ', position: [56.84273134350719,60.655642882212874], text: "Институт строительства и архитектуры" },


];

function App() {
    const [position, setPosition] = useState([56.84384143906293,60.65234332360141]);
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <>
            <Loader />
            <div className='app'>
                <UrfuMap position={position} setPosition={setPosition} locations={locations} />
                <MenuToggle toggleMenu={toggleMenu} menuOpen={menuOpen}/>
                <Menu toggleMenu={toggleMenu} className={`menu ${menuOpen ? 'open' : ''}`}  setPosition={setPosition} locations={locations} />
                <Footer/>
            </div>
        </>
    );
}

export default App;