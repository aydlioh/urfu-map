import React from 'react';
import MenuForm from './components/MenuForm';

function Menu({toggleMenu, className, setPosition, locations}) {
    return (
        <div className={className}>
            <MenuForm toggleMenu={toggleMenu} setPosition={setPosition} locations={locations}/>
            
        </div>
    );
}

export default Menu;
