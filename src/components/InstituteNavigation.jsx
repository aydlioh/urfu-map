function InstituteNavigation({AppOrDownClick , handleButtonClickBack}) {
    return (
        <div className="institute-container">
            <div>
                <a onClick={() => AppOrDownClick(-1)} className="institute__btn" href="#">Вниз</a>
            </div>
            <div>
                <a onClick={handleButtonClickBack} className="institute__btn" href="#">Назад</a>
            </div>
            <div>
                <a onClick={() => AppOrDownClick(1)} className="institute__btn" href="#">Вверх</a>
            </div>
        </div>
    );
}

export default InstituteNavigation;