import { useEffect } from 'react';


function MenuToggle({setMenuOpen, menuOpen, toggleMenu}) {
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
    }, [setMenuOpen]);

  return (
    <button className='menu-toggle' onClick={toggleMenu}>
      {menuOpen ? 'Закрыть меню' : 'Открыть меню'}
    </button>
  );
}

export default MenuToggle;
