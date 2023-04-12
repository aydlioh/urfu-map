import React, { useState } from 'react';
import MenuForm from './components/MenuForm';
import MenuList from './components/MenuList';

function Menu({toggleMenu, className, setPosition, locations}) {
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <div className={className}>
            <MenuForm
                isScrolled={isScrolled} 
                toggleMenu={toggleMenu} 
                setPosition={setPosition} 
                locations={locations}/>
            <MenuList 
                setIsScrolled={setIsScrolled} 
                toggleMenu={toggleMenu} 
                setPosition={setPosition} 
                locations={locations}/>
        </div>
    );
}

export default Menu;
