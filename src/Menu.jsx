import React, { useState, useMemo } from 'react';
import MenuForm from './components/MenuForm';
import MenuList from './components/MenuList';

export default function Menu({instituteMap, clickVisit, createRoute, handleButtonClickBack, toggleMenu, className, setPosition, locations}) {
    const [isScrolled, setIsScrolled] = useState(false);

    const [filter, setFilter] = useState({sort: '', query: ''});

    const searchedPosts = useMemo(() => {
        return [...locations].filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, [...locations]])


    return (
        <div className={className}>
            <MenuForm
                filter={filter}
                setFilter={setFilter}
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
                locations={searchedPosts}/>
        </div>
    );
}
