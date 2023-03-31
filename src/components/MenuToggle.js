import { useEffect } from 'react';


function MenuToggle({menuOpen, toggleMenu}) {
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                toggleMenu();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [toggleMenu]);

  return (
    <button className='menu-toggle' onClick={toggleMenu}>
      {menuOpen ? 'Закрыть меню' : 'Открыть меню'}
    </button>
  );
}

export default MenuToggle;
