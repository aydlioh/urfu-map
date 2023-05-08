import { FaArrowDown, FaArrowUp, FaHome } from 'react-icons/fa';



export default function InstituteNavigation({floorNumber, AppOrDownClick , handleButtonClickBack}) {
    return (
        <>
            <div className='floor-number'>{floorNumber}</div>
            <div className="institute-container">
                <div>
                    <a onClick={() => AppOrDownClick(-1)} className="institute__btn" href="#"><FaArrowDown /></a>
                </div>
                <div>
                    <a onClick={handleButtonClickBack} className="institute__btn" href="#"><FaHome /></a>
                </div>
                <div>
                    <a onClick={() => AppOrDownClick(1)} className="institute__btn" href="#"><FaArrowUp /></a>
                </div>
            </div>
        </>
    );
}
