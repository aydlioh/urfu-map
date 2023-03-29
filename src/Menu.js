import React from 'react';
import MenuForm from './components/MenuForm';

function Menu({className, setPosition, locations}) {
    return (
        <div className={className}>
            <MenuForm setPosition={setPosition} locations={locations}/>
        </div>
    );
}

export default Menu;
