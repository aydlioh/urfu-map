import React, { useState } from 'react';
import MenuForm from './components/MenuForm';
import MenuList from './components/MenuList';

export default function Menu({instituteMap, clickVisit, createRoute, handleButtonClickBack, toggleMenu, className, setPosition, locations}) {
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
                instituteMap={instituteMap}
                clickVisit={clickVisit}
                createRoute={createRoute}
                handleButtonClickBack={handleButtonClickBack}
                setIsScrolled={setIsScrolled} 
                toggleMenu={toggleMenu} 
                setPosition={setPosition} 
                locations={locations}/>
        </div>
    );
}
