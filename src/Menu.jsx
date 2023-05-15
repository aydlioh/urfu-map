import React, { useState } from 'react';
import MenuForm from './components/MenuForm';
import MenuList from './components/MenuList';

export default function Menu({handleButtonClickBack, toggleMenu, className, setPosition, locations}) {
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <div className={className}>
            <MenuForm
                handleButtonClickBack={handleButtonClickBack}
                isScrolled={isScrolled} 
                toggleMenu={toggleMenu} 
                setPosition={setPosition} 
                locations={locations}/>
            <MenuList 
                handleButtonClickBack={handleButtonClickBack}
                setIsScrolled={setIsScrolled} 
                toggleMenu={toggleMenu} 
                setPosition={setPosition} 
                locations={locations}/>
        </div>
    );
}
